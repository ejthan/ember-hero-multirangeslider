import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hero-range', 'Integration | Component | hero range', {
  integration: true
});

test('it renders', function(assert) {
  this.set('model', { id: 1, range: [20, 45]});

  this.render(hbs`{{hero-range data=model}}`);

  assert.equal(this.$().text().trim(), '20 - 45', 'label renders correct');
  assert.equal(this.$().getAttribute('style'), 'left:20%; width:25%;', 'style renders correct');
});
