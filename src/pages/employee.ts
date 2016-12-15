export class Employee {

    private nid: number;
    private name: string;
    private coordinate: any;
    private contact: string;
    private distance: number;
    constructor() { }

    setNid(value){
        this.nid = value;
    }

    getNid(){
        return this.nid;
    }

    setName(value){
        this.name = value;
    }

    getName(){
        return this.name;
    }

    setCoordinate(value){
        this.coordinate = value;
    }

    getCoordinate(){
        return this.coordinate;
    }

    setContact(value){
        this.contact = value;
    }

    getContact(){
        return this.contact;
    }

    setDistance(value){
        this.distance = value;
    }

    getDistance(){
        return this.distance;
    }
}