import Component from '@ember/component';

export default Component.extend({
    pixelToUnit(value) {
        if (this.options.bar.rectWidth == 0) {
            throw new Error('element width is 0 or element is not attached to dom')
        }
        return value / this.options.bar.rectWidth;
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
            if (item.range[0] < cursor && cursor < item.range[1]) {
                range = item.range;
            }
        })
        return range;
    },

    isOverRange(left, right) {
        return this.ranges.some((item) => {
            if (left <= item.range[0] && item.range[1] <= right) {
                return true;
            }
        });
    }
});
