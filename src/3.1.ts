{
  // oop -class
  class Animal {
    name: string;
    species: string;
    sound: string;
    constructor(name: string, species: string, sound: string) {
      this.name = name;
      this.species = species;
      this.sound = sound;
    }
    makeSound() {
      console.log(`${this.name} the ${this.species} says ${this.sound}`);
    }
  }

  const dog = new Animal("Buddy", "Dog", "Woof");
  const cat = new Animal("Whiskers", "Cat", "Meow");
  const cow = new Animal("Bessie", "Cow", "Moo");
  console.log(`${dog.name} is a ${dog.species}`);
  console.log(`${cat.name} is a ${cat.species}`);
  console.log(`${cow.name} is a ${cow.species}`);
  dog.makeSound(); // Buddy the Dog says Woof
  cat.makeSound(); // Whiskers the Cat says Meow
  cow.makeSound(); // Bessie the Cow says Moo
  //end of scope
  // oop -class
}
