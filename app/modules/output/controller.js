import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { A } from '@ember/array';
import RSVP from 'rsvp';

export default Controller.extend({
	cookies: inject(),
	file_operation: inject(),

	init() {
		this._super(...arguments);
		this.set('userName', localStorage.getItem('userName'));
		this.set('loadingState', true);
	},
	actions: {
		doSomethingWithSelectedValue(value) {
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
				conditions = {};

			if (typeof dateRange !== 'undefined') {
				this.get('logger').log(dateRange);
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
						this.set('totalNum', data.length);
						this.set('total', data);
					});
			}
		},
		confirmOutputData() {
			let hint = {
					hintModal: false,
					hintImg: true,
					title: '提示',
					content: '确认导出学员填写数据吗？',
					hintBtn: true
				},
				instance = null,
				req = null,
				dateRange = this.get('dateRange'),
				conditions = null;

			this.set('hint', hint);
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

			instance = this.get('file_operation').download('post', '/api/v1/downloadStudentReport/0', {
				condition: conditions
			});

			instance.then(func => {
				func();
				this.get('logger').log('will output stus data');
			});

		},
		outputData() {
			let hint = null,
				dateRange = this.get('dateRange');

			if (typeof dateRange !== 'undefined') {
				hint = {
					hintModal: true,
					hintImg: true,
					title: '提示',
					content: '确认导出学员填写数据吗？',
					hintBtn: true
				};
				this.set('hint', hint);
			} else {
				hint = {
					hintModal: true,
					hintImg: true,
					title: '提示',
					content: '请选择导出时间',
					hintBtn: false
				};
				this.set('hint', hint);
			}

		},
		exitSystem() {
			new RSVP.Promise((resolve) => {
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
