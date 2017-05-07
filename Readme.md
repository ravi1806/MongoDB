## Introduction

* Its Document oriented db whereas SQL is relational.
* A set of documents is called a collection. A **Collection** is equivalent to a **Table** and **document** is equivalent to a **row**.
* The collections may contain documents which contain different sets of data(unstructured data) and that is called as *dynamic schema*.
* Shell commands -> mongo //takes u into the mongo shell
* Documents are json like objects.
* Shell commands -> use dbname //creates a new db called dbname
* Shell commands -> help
* Shell commands -> show dbs //will show all the db names
* Document cant be stored into a db directly, it needs to be stored in a Collection first.
* We use insert method to add a document to the collection eg. to add to a collection called potions ->
* db.potions.insert ( { "name": "Inivisibility", "vendor": "Kettlecooked" } ) //The potions collections will be created right here if it didnt exist
* Whenver we write to db, we'll be returnd a **WriteResult** object that tells if the operation was successful or not.
* To fetch all the documents in a collection we use find method. eg. db.potions.find().


* Q: A MongoDB shell has been started below, so write the command that will set the current database to wandRecorder.
* A: use wandRecorder
* Q: The wandRecorder database has wands already loaded inside of a collection named wands. Write a command to find all of the documents in that collection.
* A: db.wands.find()
* Q: Our wand's name is "Dream Bender" and its creator is "Foxmond".Write a command to insert our wand into the wands collection.
* A: db.wands.insert({ "name": "Dream Bender", "creator": "Foxmond" });
* Q: Our friend Merlin was asking about a wand by the name of "Storm Seeker". Let's check the wands collection to see if we can find information about it.
* A: db.wands.find({"name":"Storm Seeker"}) 
* Q: Write a query that finds all wands where the creator is "Moonsap".
* A: db.wands.find({"creator":"Moonsap"})
* Q: Some wands require more experience than others. Let's record the minimum level needed to use a wand in a field named level_required. This particular wand requires level 10.We would never think of selling our wand, but it's fun to know how much it's worth anyway. Let's record the price of our wand in a field named price. This particular wand is worth 34.9 gems.Each wand can have any number of special powers, like Fire, Teleportation, or Energy. Let's record all of these power options in a field named powers. This particular wand has powers of "Fire" and "Love", which should be stored in an array.The value of the damage field should be an object with 2 properties. The magic property for this wand is 4, and the melee property is 2.
* A: ``` 
db.wands.insert({
"name": "Dream Bender",
"creator": "Foxmond",
"level_required": 10,
"price": 34.9,
"powers": ["Fire","Love"],
"damage": { magic : 4, melee: 2} })
``` 
