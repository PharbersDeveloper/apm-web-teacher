import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
	cookies: inject(),
	init() {
		this._super(...arguments);
		this.set('userName', localStorage.getItem('userName'));
	},
	actions: {
		doSomethingWithSelectedValue(value) {
			this.set('startDate', value);
			this.get('logger').log(value);
		},
		checkData() {
			let startDate = this.get('startDate');

			if (typeof startDate !== 'undefined') {
				this.get('logger').log(startDate);
			}
			return;
		},
		confirmOutputData() {
			let hint = {
				hintModal: false,
				hintImg: true,
				title: '提示',
				content: '确认导出学员填写数据吗？',
				hintBtn: true
			};

			this.set('hint', hint);
			this.get('logger').log('will output stus data');

		},
		outputData() {
			let hint = {
				hintModal: true,
				hintImg: true,
				title: '提示',
				content: '確認導出學員填寫數據嗎？',
				hintBtn: true
			};

			this.set('hint', hint);

		},
		exitSystem() {
			new Promise((resolve) => {
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