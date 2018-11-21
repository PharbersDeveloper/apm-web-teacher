import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
	token: attr('string'),
	token_expire: attr('number'),
	user: belongsTo('user', { async: false })
});