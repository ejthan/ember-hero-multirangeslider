import layout from '../templates/components/hero-rangebar';
import HeroBase from './hero-base';

export default HeroBase.extend({
  layout,
  classNames: ['hero-rangebar'],

  init() {
    this._super(...arguments);
    const default_options =  {
      min: 0,
      max: 100,
      readOnly: false,
      step: 5,
      minWidth: 5,
      maxRanges: 3
    };
    this.set('options', Object.assign({}, default_options, this.options));
  },

  didInsertElement() {
    this._super(...arguments);
    let rect = this.element.getBoundingClientRect()
    const barOptions = {
      bar: {
        rectLeft: rect.left,
        rectWidth: rect.width
      }
    }
    this.set('options', Object.assign({}, barOptions, this.options));
  }
});
