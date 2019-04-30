import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { set, computed } from '@ember/object';
import { A } from '@ember/array';
import moment from 'moment';

let convertTime = function (time) {
    var timeSplit = ['00', '00'];
    if (time) {
        timeSplit = time.split(':');
    }

    var newTime = moment().set('hour', timeSplit[0]).set('minutes', timeSplit[1]);
    return moment(newTime).format('LLLL');
}

let shift = EmberObject.extend({
    fromTime: 35,
    toTime: 45,

    range: computed('fromTime', 'toTime', {
        get() {
            return [this.get('fromTime'), this.get('toTime')];
        },
        set(key, value) {
            set(this, 'fromTime', value[0]);
            set(this, 'toTime', value[1]);
            return value;
        }
    })
});

let timeShift = EmberObject.extend({
    fromTime: 35,
    toTime: 45,

    range: computed('fromTime', 'toTime', {
        get() {
            return [convertTime(this.fromTime), convertTime(this.toTime)];
        },
        set(key, value) {
            set(this, 'fromTime', moment(value[0]).format('HH:mm'));
            set(this, 'toTime', moment(value[1]).format('HH:mm'));
            return [moment(value[0]).format('LLLL'), moment(value[1]).format('LLLL')]
        }
    })
});


export default Controller.extend({
    timeSnap: 1000 * 60 * 15,
    timeMinSize: 1000 * 60 * 60,
    timeMin: moment().startOf('day').format('LLLL'),
    timeMax: moment().endOf('day').format('LLLL'),

    testData: A([
        shift.create({ fromTime: 10, toTime: 30 }),
        shift.create({ fromTime: 65, toTime: 85 })
    ]),

    timeData: A([
        timeShift.create({ fromTime: '06:30', toTime: '08:00' }),
        timeShift.create({ fromTime: '12:00', toTime: '14:00' })
    ]),

    valueParse: function (date) {
        return moment(date, 'LLLL').valueOf();
    },

    label: function (date) {
        return moment(date[0]).format('HH:mm') + ' - ' + moment(date[1]).format('HH:mm');
    },

    actions: {
        addRange(value) {
            this.testData.pushObject(shift.create({ fromTime: value[0], toTime: value[1] }));
        },

        onChanging(model, value) {
            model.set('range', value);
        },

        addTimeRange(value) {
            this.timeData.pushObject(timeShift.create({ range: value }));
        },

        onChangingTime(model, value) {
            model.set('range', value);
        }
    }
});