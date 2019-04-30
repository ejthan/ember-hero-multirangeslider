import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { set, computed } from '@ember/object';
import { A } from '@ember/array';
//import moment from 'moment';

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

    // range: computed('fromTime', 'toTime', {
    //     get() {
    //         return [convertTime(this.fromTime), convertTime(this.toTime)];
    //     },
    //     set(key, value) {
    //         set(this, 'fromTime', moment(value[0]).format('HH:mm'));
    //         set(this, 'toTime', moment(value[1]).format('HH:mm'));
    //     }
    // })
});


export default Controller.extend({
    testData: A([
        shift.create({ fromTime: 10, toTime: 30}),
        shift.create({ fromTime: 65, toTime: 85})
    ]),
    // model: A([
    //     { id: 1, range: [moment().startOf('day').add(2, 'hours').format('LLLL'), moment().startOf('day').add(4, 'hours').format('LLLL')] },
    //     { id: 2, range: [moment().startOf('day').add(7, 'hours').format('LLLL'), moment().startOf('day').add(9, 'hours').format('LLLL')] },
    // ])
    actions: {
        addRange(value) {
            this.testData.pushObject(shift.create({ fromTime: value[0], toTime: value[1]}));
        },

        onChanging(model, value) {
            model.set('range', value);
        }
    }
});