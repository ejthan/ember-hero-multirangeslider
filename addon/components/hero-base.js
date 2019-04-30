import Component from '@ember/component';

export default Component.extend({
    pixelToUnit(value) {
        if (this.options.bar.rectWidth == 0) {
            throw new Error('element width is 0 or element is not attached to dom')
        }
        return value / this.options.bar.rectWidth;
    },

    normaliseRaw(value) {
        return this.options.min + value * 10 * (this.options.max - this.options.min) /10;
    },

    normalise(value) {
        return this.options.valueFormat(this.normaliseRaw(value));
    },

    abnormaliseRaw(value) {
        return (value - this.options.min) / (this.options.max - this.options.min);
    },

    abnormalise(value) {
        return this.abnormaliseRaw(this.options.valueParse(value));
    },

    unitToUser(value) {
        return (this.options.max - this.options.min) * value + this.options.min;
    },

    roundUserValue(value) {
        return this.options.min + Math.floor((value - this.options.min) / this.options.step) * this.options.step;
    },

    getCursorPosition(ev) {
        let x = ev.clientX - this.options.bar.rectLeft;
        return this.unitToUser(this.pixelToUnit(x));
    },

    getInsideRange(cursor) {
        let range = false;
        this.ranges.forEach((item) => {
            if (this.abnormalise(item.range[0]) < cursor && cursor < this.abnormalise(item.range[1])) {
                range = item.range;
            }
        })
        return range;
    },

    isOverRange(left, right) {
        return this.ranges.some((item) => {
            if (left <= this.abnormalise(item.range[0]) && this.abnormalise(item.range[1]) <= right) {
                return true;
            }
        });
    }
});
