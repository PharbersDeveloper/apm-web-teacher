import { helper } from '@ember/component/helper';
import { dateFormat } from '../modules/phtool/tool';


export function dataFormat(params/*, hash*/) {
	let date = params[0];

	if (typeof date === 'object') {
		return dateFormat(date, 'yyyy/MM/dd');
	}
	return date;

	/*  */
}

export default helper(dataFormat);
