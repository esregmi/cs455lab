class Subject {
    constructor() {
        this.ObserverList = [];
    }

    on(keys, fn) {

        this.ObserverList.push({ key: keys, fn: fn });
    }

    emit(key, msg) {
        this.ObserverList.forEach(element => {

            for (let k in element) {
                // console.log('hello ',element['key']);
                if (element['key'] === key) {
                    console.log(msg);
                    element['fn'](msg);
                }
            }
        }

        );
    }

}

const subject = new Subject();
function foo(msg) {
    console.log('foo: ' + msg);
}
subject.on('eat', foo);
subject.on('study', foo);
subject.emit('eat', 'Corn');
subject.emit('study', 'cs445');

