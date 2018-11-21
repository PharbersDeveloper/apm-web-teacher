// export function initialize(/* application */) {
//   // application.inject('route', 'foo', 'service:foo');
// }

// export default {
//   initialize
// };
import EmberObject from '@ember/object';
import moment from 'moment';

export default {
	name: 'setup-pikaday-i18n',
	initialize: function (application) {
		var i18n = EmberObject.extend({
			previousMonth: '上月',
			nextMonth: '下月',
			months: moment.localeData()['_months'],
			weekdays: moment.localeData()['_weekdays'],
			weekdaysShort: moment.localeData()['_weekdaysShort']
		});

		application.register('pikaday-i18n:main', i18n, { singleton: true });
		application.inject('component:pikaday-input', 'i18n', 'pikaday-i18n:main');
	}
};