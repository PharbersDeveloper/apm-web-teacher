import Route from '@ember/routing/route';

export default Route.extend({
	withLayout: false,
	model() {
		let req = {},
			conditions = {};

		req = this.get('pmController').get('Store').createModel('request', {
			id: 'getpublickey',
			res: 'bind_company_secret'
		});
		req.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
			id: 'publickey01',
			key: 'company_id',
			val: '5bd16a83ed925c081c056966'
		}));
		conditions = this.get('pmController').get('Store').object2JsonApi(req);

		this.get('pmController').get('Store').queryObject('/api/v1/publicKey/0', 'bind_company_secret', conditions)
			.then((data) => {
				this.controllerFor('index').set('publicKey', data.get('public_key'));
			});
	}
});
