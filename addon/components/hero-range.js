import layout from '../templates/components/hero-range';
import { computed } from '@ember/object';
import HeroBase from './hero-base';
import { htmlSafe } from '@ember/string';

export default HeroBase.extend({
    layout,
    classNames: ['hero-range'],
    attributeBindings: ['style'],
    _mousePressed: false,

    labelValue: computed('left', 'right', function() {
        return this.options.label([this.normalise(this.left), this.normalise(this.right)]);
    }),

    style: computed('left', 'right', function() {
        let width = this.right - this.left;
        let style = 'left:' + 100 * this.left + '%; width:' + 100 * width + '%;';
        return htmlSafe(style);
    }),

    init() {
        this._super(...arguments);
        this.set('left', this.abnormalise(this.data.range[0]));
        this.set('right', this.abnormalise(this.data.range[1]));
    },

    didInsertElement() {
        this._mouseMoveProxy = (event) => this._mouseMove(event);
        this._mouseUpProxy = (event) => this._mouseUp(event);
        this.$(document).on('mousemove', this._mouseMoveProxy);
        this.$(document).on('mouseup', this._mouseUpProxy);
    },

    willDestroyElement() {
        this.$(document).off('mousemove', this._mouseMoveProxy);
        this.$(document).off('mouseup', this._mouseUpProxy);
    },

    mouseDown(ev) {
        if (this.options.readOnly) {
            return;
        }

        this.set('_mousePressed', true);
        this.set('_pressedPosition', this.roundUserValue(this.getCursorPosition(ev)));

        if (this.$(ev.target).hasClass('left-handle')) {
            this.set('_pressedMode', 'left');
        } else if (this.$(ev.target).hasClass('right-handle')) {
            this.set('_pressedMode', 'right');
        } else {
            this.set('_pressedMode', 'this');
        }
    },

    _mouseUp() {
        this.set('_mousePressed', false);
    },

    _mouseMove(ev) {
        if (!this._mousePressed) {
            return;
        }

        let cursor = this.getCursorPosition(ev);
        let diff = cursor - this._pressedPosition;
        diff = this.roundUserValue(diff);

        if (diff == 0) {
            return
        }

        let newRight = this.normaliseRaw(this.right);
        let newLeft = this.normaliseRaw(this.left);

        if (this._pressedMode == 'this') {
            newRight += diff;
            newLeft += diff;
        }
        if (this._pressedMode == 'right') {
            newRight += diff;
        }
        if (this._pressedMode == 'left') {
            newLeft += diff;
        }

        if (newLeft < this.options.min) {
            return
        }
        if (newRight > this.options.max) {
            return
        }

        if (newRight < newLeft) {
            return
        }

        if (newRight - newLeft < this.options.minWidth) {
            return;
        }

        if (this.checkForIntersection(this.abnormaliseRaw(newLeft), this.abnormaliseRaw(newRight))) {
            return;
        }

        this.set('_pressedPosition', this._pressedPosition += diff);
        this.setValue([newLeft, newRight]);
    },


    checkForIntersection(newLeft, newRight) {
        let intersection = false;
        this.ranges.forEach((item) => {
            if (item != this.data) {
                let left = this.abnormalise(item.range[0]);
                let right = this.abnormalise(item.range[1]);
                if (left < newRight && newRight <= right) {
                    intersection = true;
                }
                if (left <= newLeft && newLeft < right) {
                    intersection = true;
                }
                if (newLeft <= left && right <= newRight) {
                    intersection = true;
                }
            }
        });
        return intersection;
    },

    setValue(value) {
        this.set('left', this.abnormaliseRaw(value[0]));
        this.set('right', this.abnormaliseRaw(value[1]));

        this.onChanging(this.data, value);
    },


});

