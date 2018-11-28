import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { A } from '@ember/array';
import rsvp from 'rsvp';
import { dateFormat } from '../phtool/tool';

export default Controller.extend({
	cookies: inject(),
	// file_operation: inject(),
	fileOperation: inject('file_operation'),
	init() {
		this._super(...arguments);
		this.set('userName', localStorage.getItem('userName'));
		this.set('loadingState', true);
		this.set('currentDate', '全部');
		this.set('chooseDate', '全部');
	},
	actions: {
		doSomethingWithSelectedValue(value) {
			this.set('chooseDate', value);
			this.get('logger').log(value);

			let timeStart = Date.parse(value),
				timeEnd = new Date().setTime((timeStart / 1000 + 24 * 60 * 60 - 1) * 1000);

			this.set('dateRange', {
				start: timeStart,
				end: timeEnd
			});
		},
		checkData() {
			this.set('loadingState', true);

			let dateRange = this.get('dateRange'),
				req = {},
				conditions = {},
				chooseDate = this.get('chooseDate');

			if (typeof dateRange !== 'undefined' || chooseDate !== '全部') {
				this.set('currentDate', chooseDate);

				req = this.get('pmController').get('Store').createModel('request', {
					id: 'checkData',
					res: 'bind_teacher_student_time_paper',
					eqcond: A([
						this.get('pmController').get('Store').createModel('eqcond', {
							id: 'elemid',
							key: 'teacher_id',
							val: 'teacherone'
						})
					]),
					gtecond: A([
						this.get('pmController').get('Store').createModel('gtecond', {
							id: 'daterangestart',
							key: 'time',
							val: dateRange.start
						})
					]),
					ltecond: A([
						this.get('pmController').get('Store').createModel('ltecond', {
							id: 'daterangeend',
							key: 'time',
							val: dateRange.end
						})
					])
				});

				conditions = this.get('pmController').get('Store').object2JsonApi(req);
				this.get('pmController').get('Store').queryMultipleObject('/api/v1/findBindTeacherStudentTimePaper/0', 'bind_teacher_student_time_paper', conditions)
					.then((data) => {
						this.set('loadingState', false);
						this.set('totalNum', data.get('length'));
						this.set('total', data);
					});
			} else {
				this.set('loadingState', false);
			}
		},

		confirmOutputData() {
			let currentDate = this.get('currentDate'),
				hint = {
					hintModal: true,
					hintImg: true,
					title: '提示',
					content: '导出成功。',
					hintBtn: false
				},
				instance = null,
				req = null,
				conditions = null,
				timeStart = Date.parse(new Date(currentDate)),
				timeEnd = new Date().setTime((timeStart / 1000 + 24 * 60 * 60 - 1) * 1000),
				dateRange = {
					start: timeStart,
					end: timeEnd
				};

			this.get('logger').log(currentDate);
			this.get('logger').log(timeStart);


			if (currentDate !== '全部') {
				req = this.get('pmController').get('Store').createModel('request', {
					id: 'checkData',
					res: 'bind_teacher_student_time_paper',
					eqcond: A([
						this.get('pmController').get('Store').createModel('eqcond', {
							id: 'elemid',
							key: 'teacher_id',
							val: 'teacherone'
						})
					]),
					gtecond: A([
						this.get('pmController').get('Store').createModel('gtecond', {
							id: 'daterangestart',
							key: 'time',
							val: dateRange.start
						})
					]),
					ltecond: A([
						this.get('pmController').get('Store').createModel('ltecond', {
							id: 'daterangeend',
							key: 'time',
							val: dateRange.end
						})
					])
				});
			} else {
				req = this.get('pmController').get('Store').createModel('request', {
					id: 'checkData',
					res: 'bind_teacher_student_time_paper',
					eqcond: A([
						this.get('pmController').get('Store').createModel('eqcond', {
							id: 'elemid',
							key: 'teacher_id',
							val: 'teacherone'
						})
					])
				});
			}
			conditions = this.get('pmController').get('Store').object2JsonApi(req);

			instance = this.get('fileOperation').download('post', '/api/v1/downloadStudentReport/0', {
				condition: conditions
			});

			instance.then(func => {
				func();
				this.set('hint', hint);

				this.get('logger').log('will output stus data');
			});

		},
		outputData() {
			let hint = null,
				date = this.get('currentDate'),
				currentDate = date === '全部' ? '全部' : dateFormat(date, 'yyyy/MM/dd');


			hint = {
				hintModal: true,
				hintImg: true,
				title: '提示',
				content: '确认导出时间节点为 ' + currentDate + ' 的学员填写数据吗？',
				hintBtn: true
			};
			this.set('hint', hint);

		},
		exitSystem() {
			new rsvp.Promise((resolve) => {
				this.get('cookies').clear('token', {
					path: '/'
				});
				localStorage.clear();
				return resolve(true);
			}
			).then(() => {
				window.location.reload();
			}
			);
		}
	}
}
);