import DS from 'ember-data';

export default DS.Model.extend({
	describe: DS.attr('string'),
	prompt: DS.attr('string'),
	state: DS.attr('boolean'),
	name: DS.attr('string')
});
