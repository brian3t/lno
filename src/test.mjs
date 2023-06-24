export default class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  sayName() {
    console.log(this.name);
  }
}
