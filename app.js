
const mongoose = require ('mongoose')
const person = require('./model/person.model')
require("dotenv").config()


const db = process.env.MONGO_DB;
mongoose
  .connect(db)
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log(e);
  });
/*-----------------inserting document---------------*/;
const personn = { name: "Anis", age: 20, favoriteFoods: "pizza" };
const persone = new person(personn);
persone
  .save()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
/*----------------- create list of people---------------------*/;
const arrayOfPeople = [
  { name: "Ahmed", age: 30, favoriteFoods: ["pizza", "sushi"] },
  { name: "Ibtisem", age: 22, favoriteFoods: ["burger", "burritos"] },
  { name: "Arij", age: 24, favoriteFoods: ["steak", "pasta"] },
];
person
  .create(arrayOfPeople)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
/*-------------------- find all documents with name Arij-----------------*/;
person
  .find({ name: "Arij" })
  .then((data) => {
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
  })
  .catch((err) => console.log(err));

/*------------------ findOne document with favorite food pasta-------*/;
person
  .findOne({ favoriteFoods: "pasta" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(error);
  });

/*--------------------------- find a document by Id------------------*/;
person
  .findById({ _id: "65c3880b1e5c32d4e5a52b68" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(error);
  });
/*------------  findById----------*/;
const personID = "65c3880b1e5c32d4e5a52b68";
person
  .findById(personID)
  .then((person) => {
    person.favoriteFoods.push("humborger");
    person
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch(console.log(error));
  })
  .catch((error) => console.log(error));
/* -------------------------- findone and update-------------*/
const personName = "Arij";
person
  .findOneAndUpdate({ name: personName }, { $set: { age: 20 } }, { new: true })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
/* ---------------- deleteOne ---------- */

person
  .findByIdAndDelete(personID)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

/*---------------- DeleteMany-------*/
person
  .deleteMany({ name: "Anis" })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

/*------------ find(), .sort(), .limit(), .select(), and then .exec()--------------*/
person
  .find({ favoriteFoods: "burritos" }) // Find people who like burritos
  .sort({ name: 1 }) // Sort them by name in ascending order
  .limit(2) // Limit the results to two documents
  .select("-age") // Hide their age
  .exec()
  .then((data) => console.log(data))
  .catch((err) => console.log(error));



