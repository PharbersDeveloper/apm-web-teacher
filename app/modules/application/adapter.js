import PharbersAdapter from 'pharbers-emberbasis-library/adapters/phadapter';

export default PharbersAdapter.extend({
	init() {
		let token = document.cookie.split(';').find(elem => elem.indexOf('token-t') > -1);

		if (typeof token === 'undefined') {
			token = 0;
		} else {
			token = token.split('=')[1];
		}

		this.set('headers', {
			'dataType': 'json',
			'contentType': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `bearer ${token}`
		});
	}
});
