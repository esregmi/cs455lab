class Regularbulb{
    constructor(){
        this.range = [50,100];
        this.age = 1;
    }
}

class EnergySaver{
    constructor(color){
        this.range = [5,40];
        this.age = 10;
        this.color = color;
    }
}

class Factory{
    createBulb(type,color){
      if(type ==="regular"){
        return new Regularbulb();
      } else if(type ==="energy"){
        return new EnergySaver(color)
      }
    }
}

const bulbs = [];
const factory = new Factory();

bulbs.push(factory.createBulb("regular"));
bulbs.push(factory.createBulb("energy", "red"));


for (let i = 0, len = bulbs.length; i < len; i++) {
    console.log(bulbs[i]);
}