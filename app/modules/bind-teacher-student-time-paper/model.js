/* eslint-disable camelcase */
import DS from 'ember-data';

export default DS.Model.extend({
	paper_id: DS.attr('string'),
	// time: DS.attr('date'),
	time: DS.attr('date-to-yyyy-mm-dd'),
	student_id: DS.attr('string'),
	teacher_id: DS.attr('string'),
	course: DS.belongsTo('course'),
	student: DS.belongsTo('student')
});
