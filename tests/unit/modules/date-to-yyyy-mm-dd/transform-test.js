import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('transform:date-to-yyyy-mm-dd', 'Unit | Transform | date to yyyy mm dd', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:date-to-yyyy-mm-dd');
    assert.ok(transform);
  });
});
