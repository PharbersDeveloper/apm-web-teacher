import Route from '@ember/routing/route';

export default Route.extend({

	model() {
		let model = [
			{
				time: '2018-11-11',
				name: '谢广坤',
				class: 'APM区域计划课'
			},
			{
				time: '2018-11-11',
				name: '谢广坤',
				class: 'APM区域计划课'
			},
			{
				time: '2018-11-11',
				name: '谢广坤',
				class: 'APM区域计划课'
			},
			{
				time: '2018-11-11',
				name: '谢广坤',
				class: 'APM区域计划课'
			},
			{
				time: '2018-11-11',
				name: '谢广坤',
				class: 'APM区域计划课'
			}
		];

		this.controllerFor('output').set('total', model.length);
		return model;
	}
});
