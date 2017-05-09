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
* ` db.potions.insert ( { "name": "Inivisibility", "vendor": "Kettlecooked" } ) ` //The potions collections will be created right here if it didnt exist
* Whenver we write to db, we'll be returnd a **WriteResult** object that tells if the operation was successful or not.
* To fetch all the documents in a collection we use find method. eg. db.potions.find().
* Dates can be added as ISODate object `'tryDate': new Date(YYYY, MM, DD)`. Dates get converted to ISO format when saved in the db.
* Array values are treated individually, which means we can query them by specifying the field of the array and the value we'd like to find.
* Object values are found using dot notation. eg. db.potions.find({ "ratings.flavor": 5 }).
* Validations supported by mongoDB are-> 1) id should be unique 2) No syntax errors 3) Document is less than 16mb.

* Q: A MongoDB shell has been started below, so write the command that will set the current database to wandRecorder.
* A: ` use wandRecorder `
* Q: The wandRecorder database has wands already loaded inside of a collection named wands. Write a command to find all of the documents in that collection.
* A: ` db.wands.find() `
* Q: Our wand's name is "Dream Bender" and its creator is "Foxmond".Write a command to insert our wand into the wands collection.
* A: ` db.wands.insert({ "name": "Dream Bender", "creator": "Foxmond" }); `
* Q: Our friend Merlin was asking about a wand by the name of "Storm Seeker". Let's check the wands collection to see if we can find information about it.
* A: ` db.wands.find({"name":"Storm Seeker"}) ` 
* Q: Write a query that finds all wands where the creator is "Moonsap".
* A: ` db.wands.find({"creator":"Moonsap"}) `
* Q: Some wands require more experience than others. Let's record the minimum level needed to use a wand in a field named level_required. This particular wand requires level 10.We would never think of selling our wand, but it's fun to know how much it's worth anyway. Let's record the price of our wand in a field named price. This particular wand is worth 34.9 gems.Each wand can have any number of special powers, like Fire, Teleportation, or Energy. Let's record all of these power options in a field named powers. This particular wand has powers of "Fire" and "Love", which should be stored in an array.The value of the damage field should be an object with 2 properties. The magic property for this wand is 4, and the melee property is 2.
* A: 
  ``` 
   db.wands.insert({
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire","Love"],
  "damage": { magic : 4, melee: 2} })
  ``` 

## Removing and Updating Document

* The remove() collection method will delete documents that match the provided query. eg. `db.potions.remove({'name':'love'})`//will remove all the documents with name: love
* To remove all documents of a collection use `db.potions.remove ( {} )`. // {} is a query for all documents.
* The update() method is used as `db.potions.update({'name':'love'}, {'$set':{'price': 3} })`
* This method only apllies to the first matching document.
* To perform updates in multiple documents use an extra parameter as `{ "multi": true }`
* In update the first object passed is the query parameter. Based on this the document will be found. Next object is the update we want in. We need to pass the $set update parameter and the object to be updated.
* We get the WriteResult as an object of 3 entries. 1) nMatched: No. of docs matched. 2) nUpserted: No. of docs created 3)nModified: No. of docs modified. 
* Updating without an operator will delete everything on the document there was before(except _ id) and only insert the new data. This is used for overwriting documents.
* $inc update operator will increment the variable by the specified amount. { "$inc": {"count":1} } //this will inc count by 1 everytime. If the field doesn't exist, it gets created with the value count: 1.
* Adding another parameter {"upsert": true} in the update method will create an instance of document right there if it didn't exist before and will add the values of the query to it.
* Q: Write the command to remove the wand with the name of "Doom Bringer" from our wands collection.
* A: `db.wands.remove({"name":"Doom Bringer"});`
* Q: let's remove any wands containing 'Death' in their powers.
* A: `db.wands.remove({'powers': 'Death'})` 
* Q: The makers of the "Devotion Shift" wand have decided to reduce its price since no one is showing interest in their luxury wand.
* A: `db.wands.update({'name': 'Devotion Shift'}, {'$set': {'price': 5.99}})`
* Q: The Grand House of Magic recently passed a law that all wands with "Fire" in their list of powers must increase their  level_required field by 2. We need to update all wands that have been affected by the new law.
* A:`db.wands.update( {'powers': 'Fire'}, {'$inc': {'level_required': 2}}, {'multi': true} )`

#### Deleting a Field
* To remove a field (of a field-value pair) we need to use the $unset operator. 
* eg. `db.potions.update( { }, { '$unset': { 'colors': ''}  }, { 'multi': true } )` // {} is a query for all the documents. $unset parameter will delete the entire field so the value for colors field doesnt matter. 'multi' is for all documents.

#### Renaming a Field
* To rename a field we use the $rename operator
* eg. `db.potions.update( { }, { '$renamne': { 'score': 'grade' } }, { 'multi': true } )`// This will rename the score field to grade

### To update an Array value
* To update an array value use the dot notation. eg.  `db.potions.update( {'ingredients':'secret'}, {'$set': {'ingredients.1': 34 } }`
* We can use a **positional operator** to set the array value of the location isnt same in all documents. eg. `db.potions.update( {'ingredients':'secret'}, { '$set': {'ingredients.$': 42}, {'multi': true} ) `. An important note is that only the first matched 'secret' will be changed to 42 in the array. multi true will act for multiple documents and not for multiple cases of 'secret' in the array. $ only matches the first instance in array.

### To update an Object value
* To update an object value use the dot notation eg. `db.potions.update( {'name': 'shrinking'}, {'$set': 'ratings.strength': 5 } )`
