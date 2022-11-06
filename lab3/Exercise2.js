class Subject {
    constructor() {
        this.observerlist = {};
    }

    on(event, fn) {
        if(this.observerlist[event]){
            this.observerlist[event].push(fn);

        }else{
            this.observerlist[event] =[fn];
        }
    }

    emit(event, message){
        if(this.observerlist[event]){
            this.observerlist[event].forEach(element => {
                element(message);
                
            });
             
        }
       
    }
}
const subject = new Subject();
subject.on('eat', console.log); 
subject.on('study', console.log); 

function foo(msg) {
    console.log('foo: ' + msg);
}
subject.on('eat', foo);
subject.on('study', foo);

subject.emit('eat', 'Corn');

subject.emit('study', 'cs445');
