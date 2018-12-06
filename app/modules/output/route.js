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

		this.get('pmController').get('Store').queryMultipleObject('/api/v1/findBindTeacherStudentTimePaper/0', 'bind_teacher_student_time_paper', conditions)
			.then((data) => {
				this.controllerFor('output').set('total', data);
				this.controllerFor('output').set('loadingState', false);
				return null;
			})
			.then(() => {
				req = this.get('pmController').get('Store').createModel('request', {
					id: 'findDataLength',
					res: 'bind_teacher_student_time_paper',
					fmcond: this.get('pmController').get('Store').createModel('fmcond', {
						id: 'countData2',
						skip: 0,
						take: 1000
					})
				});

				req.get('eqcond').pushObject(this.get('pmController').get('Store').createModel('eqcond', {
					id: 'countData1',
					key: 'teacher_id',
					val: 'teacherone'
				}));
				conditions = this.get('pmController').get('Store').object2JsonApi(req);
				return this.get('pmController').get('Store').queryObject('/api/v1/findBindTeacherStudentTimePaperCount/0', 'bind_teacher_student_time_paper', conditions);

			}).then(data => {
				this.controllerFor('output').set('totalNum', data.get('count'));
			});
	}
});
