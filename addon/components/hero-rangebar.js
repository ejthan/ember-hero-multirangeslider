import layout from '../templates/components/hero-rangebar';
import HeroBase from './hero-base';

export default HeroBase.extend({
  layout,
  classNames: ['hero-rangebar'],

  init() {
    this._super(...arguments);
    let default_options =  {
      min: this.min ? this.min : 0,
      max: this.max ? this.max : 100,
      readOnly: this.readOnly ? this.readOnly : false,
      step: this.step ? this.step : 5,
      minWidth: this.minWidth ? this.minWidth : 5,
      maxRanges: this.maxRanges ? this.maxRanges : 3,
      valueParse: this.valueParse ? this.valueParse : (value) => {
        return value;
      },
      label: this.label ? this.label : (value) => {
        return value[0].toString() + '-' + value[1].toString();
      },
      valueFormat: this.valueFormat ? this.valueFormat : (value) => {
        return value;
      }
    };
    default_options = this._transformOptions(default_options);
    this.set('options', default_options);
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

  _transformOptions(options) {
    if (options.valueParse) {
      for (let key of ['min', 'max']) {
        options[key] = options.valueParse(options[key]);
      }
    }
    return options
  },

  getPhantomValue(cursor) {
    if (this.getInsideRange(this.abnormaliseRaw(cursor))) {
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

    let rangeLeft = this.getInsideRange(this.abnormaliseRaw(left));
    if (rangeLeft) {
      left = rangeLeft[1];
      right = left + this.options.minWidth;
    }

    let rangeRight = this.getInsideRange(this.abnormaliseRaw(right));
    if (rangeRight) {
      right = rangeRight[0];
      left = right - this.options.minWidth;
    }

    if (this.getInsideRange(this.abnormaliseRaw(left)) || this.getInsideRange(this.abnormaliseRaw(right))) {
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
