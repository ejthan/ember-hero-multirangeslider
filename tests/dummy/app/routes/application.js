import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { set, computed } from '@ember/object';
import moment from 'moment';

// let convertTime = function (time) {
//     var timeSplit = ['00', '00'];
//     if (time) {
//         timeSplit = time.split(':');
//     }

//     var newTime = moment().set('hour', timeSplit[0]).set('minutes', timeSplit[1]);
//     return moment(newTime).format('YYYY-MM-DDTHH:mm:ssZ');
// }

let shift = EmberObject.extend({
    id: 1,
    fromTime: 35,
    toTime: 45,

    range: computed('fromTime', 'toTime', {
        get() {
            return [this.fromTime, this.toTime];
        },
        set(key, value) {
            set(this, 'fromTime', value[0]);
            set(this, 'toTime', value[1]);
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

export default Route.extend({
    model() {
        let model1 = shift.create({ fromTime: 10, toTime: 30});
        let model2 = shift.create({ fromTime: 65, toTime: 85});
        return [model1, model2];
        // return [
        //     { id: 1, range: [10, 30] },
        //     { id: 2, range: [50, 80] }
        // ];
    }
});