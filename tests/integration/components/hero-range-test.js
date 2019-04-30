import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | hero-range', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    this.set('model', { id: 1, range: [20, 45]});

    await render(hbs`{{hero-range data=model}}`);

    assert.equal(this.element.innerText, '20 - 45', 'label renders correct');
    assert.equal(this.element.querySelector('div').getAttribute('style'), 'left:20%; width:25%;', 'style renders correct');
  });
});