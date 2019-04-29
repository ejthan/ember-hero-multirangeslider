import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hero-rangebar', 'Integration | Component | hero rangebar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{hero-rangebar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#hero-rangebar}}
      template block text
    {{/hero-rangebar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
