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
  },

  mouseMove(ev) {
    if (this.phantom) {
      return;
    }

    if (this.options.readOnly) {
      return;
    }

    if (this.ranges.length >= this.options.maxRanges) {
      return;
    }

    let cursor = this.getCursorPosition(ev);
    let phantomData = this.getPhantomValue(cursor);

    if (!phantomData) {
      return;
    }

    this.set('phantomData', { range: phantomData });
    this.set('phantom', true);
  },

  mouseLeave() {
    this.set('phantom', false);
  },

  getPhantomValue(cursor) {
    if (this.getInsideRange(cursor)) {
      return null;
    }

    cursor = this.roundUserValue(cursor);
    let h = this.options.minWidth / this.options.step;
    let dLeft = Math.floor(h / 2) * this.options.step;
    let dRight = Math.floor((h + 1) / 2) * this.options.step;

    let left = cursor - dLeft;
    let right = cursor + dRight;

    if (this.options.max < right) {
      right = this.options.max;
      if (right - left < this.options.minWidth) {
        left = this.options.max - this.options.minWidth;
      }
    }

    if (left < this.options.min) {
      left = this.options.min;
      if (right - left < this.options.minWidth) {
        right = this.options.min + this.options.minWidth;
      }
    }

    let rangeLeft = this.getInsideRange(left);
    if (rangeLeft) {
      left = rangeLeft[1];
      right = left + this.options.minWidth;
    }

    let rangeRight = this.getInsideRange(right);
    if (rangeRight) {
      right = rangeRight[0];
      left = right - this.options.minWidth;
    }

    if (this.getInsideRange(left) || this.getInsideRange(right)) {
      return null
    }

    if (left < this.options.min) {
      return null
    }

    if (this.options.max < right) {
      return null
    }

    return [left, right]
  },

  actions: {
    addRange(value) {
      this.addRange(value);
    },

    onChanging(model, value) {
      this.onChanging(model, value);
    }
  }
});
