import Controller from '@ember/controller';

export default Controller.extend({
	actions: {
		exitSystem() {
			new Promise((resolve) => {
				this.get('cookies').clear('token', { path: '/' });
				localStorage.clear();
				return resolve(true);
			}).then(() => {
				window.location.reload();
			});
		}
	}
});
