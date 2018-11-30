import Component from '@ember/component';

export default Component.extend({
	showExitBtn: false,
	actions: {
		showExit() {
			this.toggleProperty('showExitBtn');
			this.get('logger').log(this.get('showExitBtn'));

		},
		exitSystem() {
			// eslint-disable-next-line ember/closure-actions
			this.sendAction('exitSystem');
		}
	}
});