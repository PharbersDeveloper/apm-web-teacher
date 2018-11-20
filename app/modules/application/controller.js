import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
	cookies: inject(),
	userName: '',
	init() {
		this._super(...arguments);
		this.set('userName', localStorage.getItem('userName'));
	}
});
