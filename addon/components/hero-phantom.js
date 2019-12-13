import Range from './hero-range';
import layout from '../templates/components/hero-phantom';

export default Range.extend({
  layout,
  classNames: ['hero-range', 'hero-phantom'],

  mouseDown() {
    this.set('_mousePressed', true);
  },

  _mouseUp() {
    if (this.showPhantom && this._mousePressed) {
      this.addRange([this.normaliseRaw(this.left), this.normaliseRaw(this.right)]);
    }
    this.set('_mousePressed', false);
    this.set('showPhantom', false);
  },

  _mouseMove(ev) {
    let cursor = this.getCursorPosition(ev);

    if (this.getInsideRange(this.abnormaliseRaw(cursor))) {
      if (!this._mousePressed) {
        this.set('showPhantom', false);
      }
      return
    }

    let center = (this.left + this.right) / 2;
    cursor = this.roundUserValue(cursor);

    let h = this.options.minWidth / (this.options.step);
    let dLeft = Math.floor(h / 2) * this.options.step;
    let dRight = Math.floor((h + 1) / 2) * this.options.step;

    let [newLeft, newRight] = [this.normaliseRaw(this.left), this.normaliseRaw(this.right)];

    if (this._mousePressed) {
      if (this.abnormaliseRaw(cursor) < center) {
        newLeft = cursor - dLeft;
      }
      if (this.abnormaliseRaw(cursor) > center) {
        newRight = cursor + dRight;
      }
    } else {
      [newLeft, newRight] = [cursor - dLeft, cursor + dRight];
    }

    if (newRight > this.options.max) {
      newRight = this.options.max;
      if (!this._mousePressed) {
        newLeft = newRight - this.options.minWidth;
      }
    }
    if (newLeft < this.options.min) {
      newLeft = this.options.min;
      if (!this._mousePressed) {
        newRight = newLeft + this.options.minWidth;
      }
    }

    if (this.getInsideRange(this.abnormaliseRaw(newLeft)) || this.getInsideRange(this.abnormaliseRaw(newRight))) {
      return
    }

    if (this.isOverRange(newLeft, newRight)) {
      return
    }

    this.setValue([newLeft, newRight]);
  },

  setValue(value) {
    this.set('left', this.abnormaliseRaw(value[0]));
    this.set('right', this.abnormaliseRaw(value[1]));
  }

});
