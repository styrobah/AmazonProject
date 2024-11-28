class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo(){
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk is open: ${trunkStatus}`);
    }

    go(){
        if(this.isTrunkOpen === false){
            this.speed += 5;
        }else{
            console.log(`Car can't move because trunk is open`);
        }
        
        // Limit the speed to 200.
        if (this.speed > 200) {
            this.speed = 200;
        }
    }

    brake(){
        this.speed -= 5;

        // Limit the speed to 0.
        if (this.speed < 0) {
            this.speed = 0;
        }
    }

    openTrunk(){
        if(this.speed === 0 ){
            this.isTrunkOpen = true;
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }

}

class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        this.speed += this.acceleration;

        // Limit the speed to 300.
        if (this.speed > 300) {
            this.speed = 300;
        }
    }

    openTrunk() {
        console.log('Race cars do not have a trunk.');
    }
    
    closeTrunk() {
        console.log('Race cars do not have a trunk.');
    }
}


const car1 = new Car({
    brand : 'Toyota',
    model : 'Corolla'
});

const car2 = new Car({
    brand : 'Tesla',
    model : 'Model 3'
});

const raceCar = new RaceCar({
    brand : 'McLaren',
    model : ' F1',
    acceleration : 20
});


raceCar.displayInfo();
raceCar.go();
raceCar.displayInfo();
raceCar.go();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();


car1.brake();
car1.displayInfo();

// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();
car1.go();
car1.displayInfo();
car1.go();
car1.openTrunk();
car1.displayInfo();
car1.closeTrunk();
car1.go();
car1.displayInfo();
