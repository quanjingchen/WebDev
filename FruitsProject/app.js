const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');
  const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
  });
  const Fruit = mongoose.model("Fruit", fruitSchema);

  const apple = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
  });
  const orange = new Fruit({
    name: "Orange",
    rating: 4,
    review: "Too sour for me."
  });
  const pineapple = new Fruit({
    name: "Pineapple",
    rating: 8,
    review: "Dream."
  });

  // Fruit.insertMany([apple, orange, pineapple], function(error, docs) {
  //   if (error) {
  //     console.log("failed");
  //   } else {
  //     console.log("successfully added many")
  //   }
  // });

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
  });
  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name: "John",
    age: 7,
    favouriteFruit: pineapple
  });
  console.log(person.name);
  //person.save();
  Person.updateOne({ name: 'John' }, {favouriteFruit: apple}, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log("successfully updated");
      }
  });

  // Fruit.find({
  //   name: 'Apple'
  // }, function(err, docs) {
  //   if (err) {
  //     console.log("error");
  //   } else {
  //     docs.forEach(function(item) {
  //
  //       console.log(item.name);
  //       mongoose.connection.close();
  //
  //     });
  //   }
  // });

}


// Fruit.insertMany([apple, orange], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully added");
//   }
// });
//
