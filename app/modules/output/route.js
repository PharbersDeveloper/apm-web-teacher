import Route from '@ember/routing/route';

export default Route.extend({

	model() {
		let req = {},
			conditions = {};

		req = this.get('pmController').get('Store').createModel('request', {
			id: 'checkData',
			res: 'bind_teacher_student_time_paper'
		});
		req.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
			id: 'eqcond01',
			key: 'teacher_id',
			val: 'teacherone'
		}));
		conditions = this.get('pmController').get('Store').object2JsonApi(req);

		this.get('logger').log(conditions);
		this.get('pmController').get('Store').queryMultipleObject('/api/v1/findBindTeacherStudentTimePaper/0', 'bind_teacher_student_time_paper', conditions)
			.then((data) => {
				this.get('logger').log(data);
				this.controllerFor('output').set('totalNum', data.length);
				this.controllerFor('output').set('total', data);
				this.controllerFor('output').set('loadingState', false);


			});
	}
});
