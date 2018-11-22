import DS from 'ember-data';
import { dateFormat } from '../phtool/tool';

export default DS.Transform.extend({
	deserialize(serialized) {
		if (serialized !== 0) {
			return dateFormat(serialized, 'yyyy/MM/dd');
		}
		return serialized;

	},

	serialize(deserialized) {
		return deserialized;
	}
});

