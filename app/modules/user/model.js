import DS from 'ember-data';

export default DS.Model.extend({
	user_name: DS.attr('string'),
	user_phone: DS.attr('string', { defaultValue: '' }),
	password: DS.attr('string'),
	email: DS.attr('string'),
	image: DS.attr('string', { defaultValue: '' }),
	user_phone: DS.attr('string', { defaultValue: '' }),
	company_name: DS.attr('string', { defaultValue: '' }),
	position_name: DS.attr('string', { defaultValue: '' })
});
