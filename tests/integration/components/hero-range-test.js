import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

let default_options = {
  min: 0,
  max: 100,
  readOnly: false,
  step: 5,
  minWidth: 5,
  maxRanges: 3,
  valueParse: (value) => {
    return value;
  },
  label: (value) => {
    return value[0].toString() + ' - ' + value[1].toString();
  },
  valueFormat: (value) => {
    return value;
  }
};

let time_options = {
  step: 1000 * 60 * 15,
  minWidth: 1000 * 60 * 60,
  readOnly: false,
  maxRanges: 3,
  min: moment().startOf('day').valueOf(),
  max: moment().endOf('day').valueOf(),
  valueParse: function (date) {
    return moment(date, 'LLLL').valueOf();
  },
  label: function (date) {
    return moment(date[0]).format('HH:mm') + ' - ' + moment(date[1]).format('HH:mm');
  },
  valueFormat: (value) => {
    return value;
  }
};

module('Integration | Component | hero-range', function(hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      assert.expect(2);

      this.set('model', { id: 1, range: [20, 45] });

      this.set('options', default_options);

      await render(hbs`{{hero-range data=model options=options}}`);


      assert.equal(this.element.innerText, '20 - 45', 'label renders correct');
      assert.equal(this.element.querySelector('div').getAttribute('style'), 'left:20%; width:25%;', 'style renders correct');
    });

    test('it renders with time values', async function (assert) {
      assert.expect(1)

      let range = [
        moment().startOf('day').add(6, 'hours').format('LLLL'),
        moment().startOf('day').add(8, 'hours').format('LLLL'),
      ];

      this.set('model', { id: 1, range: range });
      this.set('options', time_options);

      await render(hbs`{{hero-range data=model options=options}}`);

      assert.equal(this.element.innerText, '06:00 - 08:00', 'label renders correct');
      //assert.equal(this.element.querySelector('div').getAttribute('style'), 'left:20%; width:25%;', 'style renders correct');
    });
  });