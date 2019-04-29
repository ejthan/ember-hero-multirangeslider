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
    }
});
