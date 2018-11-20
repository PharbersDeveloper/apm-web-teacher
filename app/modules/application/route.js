import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
	cookies: inject(),
	acrivate() {
		this.controllerFor('application').set('userName', localStorage.getItem('userName'));
	}

});