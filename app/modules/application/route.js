import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import moment from 'moment';

export default Route.extend({
	cookies: inject(),
	beforeModel() {
		moment.locale('zh-cn');
		// let token = this.get('cookies').read('token'),
		// loginController = this.controllerFor('index');


		// if (!token) {
		// 	if (transition.targetName !== 'index') {
		// 		loginController.set('previousTransition', transition);
		// 		loginController.set('applicationController', this.controllerFor('application'));
		// 	}
		// 	this.transitionTo('index');
		// } else if (transition.targetName === 'index') {
		// 	this.transitionTo('output');
		// }
		/**
		 * 每次刷新清除cookies
		 */
		this.get('cookies').clear('token', { path: '/' });
		localStorage.clear();
		this.transitionTo('index');
	},
	acrivate() {
		this.controllerFor('application').set('userName', localStorage.getItem('userName'));
	}

});