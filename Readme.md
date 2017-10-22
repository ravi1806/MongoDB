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
## Getting Started 

* Download the latest community version from mongodb website.
* Untar the file by command tar xvf 'filename'
* Go to the bin directory 
* Inside bin there is mongo and mongod, mongo is the shell program that connects to the db, mongod is the server.
* The server mongod will keep its data in the /data/db directory by default. So we must create the path.
* To do that we need root privelages by sudo bash
* Then mkdir -p /data/db .. We need to use -p becaouse it stands for parents. no error if data was existing else make a new dir data and make another dir db inside it. 
* Then give the permission to user by using chmod 777 to data first and then data/db
* Start the server by ./mongod ( u need to be inside bin folder of the extracted folder )
* By default server listens on port 27017
* start mongo shell by giving command mongo
* copy all files of this bin folder to /usr/local/bin
* exit route and type which mongod to check
* show dbs
* use dbname wll create the db if it wasnte existing, and switch to it.

## Intro to creating and deleting documents.

* use video //now our db is video
* db.movies.insertOne({'movieName': 'La La Land', 'year': 2916}); // this is like video.movies.insertOne
* db.movies.insertOne({'movieName': 'Lola', 'year': 2912}); 
* db.movies.find();
* db.movies.find().pretty();
* db.movies.find({'title': 'La La Land'}).pretty();
* the return of find is a cursor object, NOT an array of documents. 
* So we can have var c = db.movies.find();
* let c = db.movies.find();
* c.hasNext() // will return true
* c.next()
* c.next()

## Hello, World on nodejs
* Make a file app.js
```js
const http = require('http'); //inbuilt node library has http
const server = http.createServer(function(request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"}); // Do this for any request
        response.end('Hello, World!!\n'); // Send response
});

server.listen(8000);
console.log('Server running at http://localhost:8000');
```
* node app.js
* run in browser localhost:8000

## Intro to Nodejs driver

* ```js

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


$pop = 1 for last elem, -1 for first elem. only modifies array doesnt return anything
$push
$addToSet: only adds to array if already not existing(set)


1.2 Dispelling the Database 250 PTS
We've inherited a database that stores information about magic wands.

A MongoDB shell has been started below, so write the command that will set the current database to wandRecorder.

A: use wandRecorder

The wandRecorder database has wands already loaded inside of a collection named wands. Write a command to find all of the documents in that collection.

A: db.wands.find();


We're proud of the shiny new wand we've just purchased, so let's add it to the wands collection. Our wand's name is "Dream Bender" and its creator is "Foxmond".
Write a command to insert our wand into the wands collection.

A: db.wands.insert({name: 'Dream Bender', 'creator': 'Foxmond'});


Our friend Merlin was asking about a wand by the name of "Storm Seeker". Let's check the wands collection to see if we can find information about it.

A: db.wands.find({"name": "Storm Seeker"});


Merlin must be losing his marbles, because he actually wanted us to search for any wand created by "Moonsap".Write a query that finds all wands where the creator is "Moonsap".

A: db.wands.find({"creator": "Moonsap"});


1.8 Wand Summonings
There's a lot more about wands than just their name and creator, so let's add a new wand with much more detailed information.

Some wands require more experience than others. Let's record the minimum level needed to use a wand in a field named level_required. This particular wand requires level 10.We would never think of selling our wand, but it's fun to know how much it's worth anyway. Let's record the price of our wand in a field named price. This particular wand is worth 34.9 gems.Each wand can have any number of special powers, like Fire, Teleportation, or Energy. Let's record all of these power options in a field named powers. This particular wand has powers of "Fire" and "Love", which should be stored in an array.Magical folk are a peace-loving people, but occasionally they need to throw down, so it's a good idea to store each wand's damage capability in a field named damage. Most wands can cause 2 types of damage — magic and melee.The value of the damage field should be an object with 2 properties. The magic property for this wand is 4, and the melee property is 2.Now that we've built out a wand with all the correct information, go ahead and insert it into the wands collection.

db.wands.insert({
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire", "Love"],
  "damage": {"magic": 4, "melee": 2}
});



We've upgraded our wands with data for all of the new fields. Now we can write fun queries to find out — for example — which wands have "Fire" in their list of powers. Try writing a query based on this.

A: db.wands.find({"powers": "Fire"}); //same to search inside an array like we do for other key value


2.2 Oblitero Wand I 250 PTS
While Merlin was looking through our wand information, he suddenly began to panic about a wand named the "Doom Bringer" and he ran out screaming. We should probably get rid of that wand if it scares a great wizard like Merlin.
Write the command to remove the wand with the name of "Doom Bringer" from our wands collection.

A: db.wands.remove({"name": "Doom Bringer"});

2.3 Oblitero Wand II 250 PTS
When we removed the "Doom Bringer" wand, we noticed that it had a power of "Death", and we don't want any wands like that in our database. To be safe, let's remove any wands containing that in their powers.

A:db.wands.remove({"powers": "Death"},{"multi": true});


2.4 Wand Reductions 250 PTS
The makers of the "Devotion Shift" wand have decided to reduce its price since no one is showing interest in their luxury wand.
Write the command to update the wand with a name of "Devotion Shift" and set the price to 5.99.

db.wands.update({"name": "Devotion shift"}, 
               {"$set": {"price": 5.99}}
               );

2.5 Magical Regulations 250 PTS
The Grand House of Magic recently passed a law that all wands with "Fire" in their list of powers must increase their level_required field by 2. We need to update all wands that have been affected by the new law.Great! Now add an update parameter to increment the level_required by 2.Now that we have a working update command, change it so that the update will apply to all documents that match the query.

A: db.wands.update(
  {"powers": "Fire"},
  {"$inc": {"level_required": 2}},
  {"multi": true}
)


2.6 User Chronicles 250 PTS
We'd like to see which wands users are looking at most. To do this, we'll use the logs collection that contains documents that record the name and count for each wand.
First, let's add the query parameter to find a wand with the name of "Dream Bender".Great! Now add the update parameter to increment the count field by 1.Add the option that will create a new document if none match the query or update an existing document.

A: 

db.logs.update(
  {"name": "Dream Bender"},
  {"$inc": {"count": 1}},
  {"upsert": true}
)


2.8 Smelly Wands 250 PTS
A few of the old wands included a smell field, and we're not exactly sure why anyone thought that would be a relevant field. Let's get rid of it!
Add the update parameter that will remove the smell field from all documents.

db.wands.update(
  {},
  {"$unset": {"smell": "" }},
  {"multi": true}
)


2.9 Disgruntled Wand Makers 250 PTS
We've been getting some complaints from wand makers that the term "creator" doesn't properly convey the true nature of their craft. To make them happy, we need to change the field creator to maker.

db.wands.update(
  {},
  {"$rename": {"creator": "maker"}},
  {"multi": true}
)


2.10 Abracadabra Array Alterations I 250 PTS
We want to be the go-to source for wand information. Currently, we are listing one-word powers for each wand, but we should probably start being more specific. Here's the document we'll be working with:
{
  "_id": ObjectId("56016414959123c11810f9ad"),
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire", "Love"],
  "damage": {"magic": 4, "melee": 2}
}
For the wand above, let's add the update parameter to set the value of "Fire" to "Fire Deflection" in the powers array.Remember that we only want to update a single array value, not all of the values in the array.

db.wands.update(
  {"name": "Dream Bender"},
  {"$set": {"powers.0": "Fire Deflection"}}
)


2.11 Abracadabra Array Alterations II 250 PTS
We know that there are a lot of wands with the power of "Love", but the correct power is actually named "Love Burst". We'll need to update all wands that contain this power.
Add the update parameter using the positional operator to change the value of "Love" to "Love Burst".

{
  "_id": ObjectId("56016414959123c11810f9ad"),
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire Deflection", "Love"],
  "damage": {"magic": 4, "melee": 2}
}

A: db.wands.update(
  {"powers": "Love"},
  {"$set": {"powers.$": "Love Burst"}},
  {"multi": true}
)



2.12 Abracadabra Array Alterations III 250 PTS
While some people may know that wands can cast spells, others may think they're just fancy sticks. Let's add "Spell Casting" to the list of powers for the "Dream Bender" wand.


A: db.wands.update(
  {"name": "Dream Bender"},
  {"$push": {"powers":"Spell Casting"}}
)

2.13 Abracadabra Array Alterations IV 250 PTS
Example document:

{
  "_id": ObjectId("56016414959123c11810f9ad"),
  "name": "Dream Bender",
  "creator": "Foxmond",
  "level_required": 10,
  "price": 34.9,
  "powers": ["Fire Deflection", "Love Buster", "Spell Casting"],
  "damage": {"magic": 4, "melee": 2}
}
Let's go ahead and add "Spell Casting" to every wand's powers array, but only if that power doesn't already exist.

db.wands.update(
  {},
  {"$addToSet": {"powers": "Spell Casting"}},
  {"multi": true}
)

2.14 Sensible Stats 250 PTS
People are getting confused by the damage stats for each wand. We've been basing damage on a scale of 1-10, but we should be using a scale of 1-100. We've gone ahead and updated "damage.magic" by multiplying the original value by 10 for all the documents. Here's an example:

db.wands.update(
  {},
  {"$mul": {"damage.melee": 10}},
  {multi: true}
)

3.2 Picky Preferences 250 PTS
When it comes to wands, it's okay to be picky about which one we want.
First, find all the wands where the maker is "Moonsap".First, find all the wands where the maker is "Moonsap".Now, update the query to only retrieve wands that have a level_required of 5.

A: db.wands.find(
  {"maker": "Moonsap", "level_required": 5}
)


3.3 Supernatural Stats 250 PTS
Believe it or not, some lower-level wands have better stats than those that are equal to our current level.Write a query for wands that have a level_required that is less than or equal to 5.

A:db.wands.find(
  {"level_required": {"$lte": 5}}
)



3.4 All You Need Is Love 250 PTS
Wands can only have a few powers, so it's important to make sure your wand doesn't contain any powers you don't like.
Write a query for wands that do not include "Love Burst" in their powers.

A: db.wands.find(
  {"powers": {"$ne": "Love Burst"}}
)


3.5 Marvelously Mighty Melee 250 PTS
At our current level, we can't do much magic damage yet, but we can do melee damage all the way up to 40.
Let's find out which wands have a "damage.melee" that is greater than or equal to 30 and less than or equal to 40

A: db.wands.find(
  {"damage.melee": {"$gte": 30, "$lte": 40}}
  
)


3.6 Bananas for Wands 250 PTS
Wands come in a variety of lengths, and the magic folk use bananas for measurement. We've added a new lengths field to each wand that contains an array of the different lengths a wand comes in.To find a proper wand, we'll need one that fits our size.Write a query that will find any wands that contain lengths that are greater than or equal to 2.5 but less than 3. Remember, arrays can be tricky!

A: db.wands.find(
  {"lengths": {"$elemMatch": {"$gte": 2.5, "$lt": 3}}}
)


3.7 Merlin's Mythical Madness 250 PTS
Now that we're getting pretty good at finding wands, let's find the perfect wand for our friend Merlin.
Merlin's first requirement is the wand must not be made by "Foxmond".Write the query to find wands that don't have "Foxmond" as the maker.Next, Merlin's level is 75 so we'll want to add a query for a level_required that is less than or equal to 75.Merlin doesn't want to spend more than 50 gems. Add another query that makes sure the price is less than 50.Lastly, make sure the wand is 3 to 4 banana lengths. Remember, arrays can be tricky!

A: db.wands.find(
  {"maker": {"$ne": "Foxmond"}, 
   "level_required": {"$lte": 75},
   "price": {"$lt": 50},
   "lengths": {"$elemMatch": {"$gte": 3, "$lte": 4}}
  }
)


3.9 Precise Projections 250 PTS
We'd like to have an index page where users can see the name of all the wands we have in our database.
Write a query that will find all wands, but this time project only the name field. Don't worry about the _id showing up in the results for now.We've got all the names, but they're all jumbled up. Add a cursor method to sort the names alphabetically.

A: db.wands.find({}, {"name": true}).sort({"name": 1});

3.10 The Realm of Requirements 250 PTS
We need to create a report detailing all the wand information except for their price and lengths. Since non-developers will be looking at this report, let's remove the _id as well.
Write a query for all wands that excludes the price, lengths, and _id field.
A: db.wands.find({}, {"price": false, "lengths": false, "_id": false });
The criteria for the report have changed. We need to write a query to include the name and powers fields.Include only the needed fields, but continue to exclude to _id field.
A: db.wands.find({}, {"name": true, "powers": true, "_id": false });


3.11 Casting the Count 250 PTS
For the sake of science and all things good, let's find out how many wands only have a level_required of 2.
Write a query to find wands with a level_required of 2, and then use the appropriate cursor method to count the total.
db.wands.find({"level_required": 2}).count();

3.12 
Finish the code below so that only 8 wands are returned by the cursor for each page:
db.wands.find({}).skip(0).limit(8);

3.13 Fantastical Findings 250 PTS
Some really famous wizards and sorceresses are interested in finding out information about the most expensive wands we have. Let's pull the data on our top three most expensive wands.
First, let's write a query to match all wands.Next, add a cursor method to sort the wands in descending order by their price field.Lastly, add another cursor method to limit the results to only 3 documents.
db.wands.find({}).sort({"price": -1}).limit(3)


4.2 Marvelous Merging 250 PTS
Fill in the blank with the correct answer.

When we take the data from one document and place it inside another one, that's called an 
*embedded* document.

4.3 Related Realms 250 PTS
Fill in the blank with the correct answer.

If we take a unique value like an _id from one document and store it as a value within a related document, we have just created a *referenced* document.

4.5 What's the minimum number of queries we'd have to write in order to retrieve a document and its referenced data?
A: 2


4.6 Chalice of Choices 250 PTS
Which modeling option would give us all the data we need with a single query, support for atomic writes, and is great for data that is strongly related?
A: Embdedding

4.7 Cauldrons of Considerations 250 PTS
Which data modeling decision doesn't have default support for atomic writes across multiple documents and should be utilized with care?
A: Referenced

4.10 Unique Users 250 PTS
Which data modeling option would be the best fit for storing users and their addresses when we know that the data is used together often, won't be changing regularly, and each user will only be storing a few addresses?
A: Embeddig

4.11 Charming Cars 250 PTS
We'd like to store information about cars, and each car can have a few hundred parts. Most of the time, we won't be needing specific information about each part. Which data modeling route should we take?
A: Referencing

4.12 Charming Changes 250 PTS
Which modeling route is best when we have data that is constantly changing and will help prevent data inconsistencies from arising?
A: Referencing

4.13 Bewitched Access 250 PTS
Which data modeling route allows us to access our data independently instead of having to use something like dot notation to get information?
A: Referencing

5.2 Many Makers 250 PTS
Not only have we been adding wands, but our users have been adding new ones daily! Let's create a list of all the unique wand makers in our database.
A: db.wands.aggregate([{"$group": {"_id":"$maker"}}]);

5.3 Detecting Damage 250 PTS
Most of our users only care about the magic damage for their wand. After all, what's the point of doing awesome spells at low levels? Let's find out how many wands we have for each damage.magic score.

A: db.wands.aggregate([{"$group": {"_id": "$damage.magic", "wand_count": {"$sum": 1}}}]);

5.4 Royal Connoisseurs 250 PTS
Our site is a popular resource for wand collectors to find wands by makers they don't yet have. One ambitious connoisseur has asked how much it would cost to buy all the wands for each vendor. Let's find out!
Write an aggregate that groups our wands by the maker field.Add an accumulator with the total_cost field that sums the price for each wand per maker.

A: db.wands.aggregate([{"$group": {
                                "_id": "$maker",
                                "total_cost": {"$sum": "$price"}
                               }}]);


5.5 Mischievous Makers 250 PTS
They say that knowledge is power. Let's see what sort of interesting information we can find out based on the data we have. We have a slight suspicion that wand makers like to charge more for wands at "monumental levels". Time to prove it!
Write an aggregate to group wands by their level_required.

A: db.wands.aggregate([{"$group": {"_id": "$level_required", "price_average": {"$avg": "$price"}}}]);


5.6 A Glimmering Guide 250 PTS
Let's put together a simple buyer's guide with some basic stats about makers to help our users quickly make wand decisions.
Write an aggregate to group wands by their maker.Add an accumulator with the field total_wands to sum the number of wands each maker has.Now add an accumulator with the field max_magic that finds that greatest damage.magic per maker. Lastly, add one more accumulator with the field lowest_price that finds the lowest wand price per maker.

A: db.wands.aggregate([{
  "$group": {
    "_id": "$maker",
    "total_wands": {"$sum": 1},
    "max_magic": {"$max": "$damage.magic"},
    "lowest_price": {"$min": "$price"}          
  }
}]);


5.8 Lower-level Castings 250 PTS
Some wand powers can be harder to find in lower-level wands. We've heard that the power "Air Bolt" is a really fun one to have. Let's find out which makers offer a wand with that power and find the lowest level_required per maker.
Write an aggregate that will only match wands that have "Air Bolt" in their list of powers.Add another aggregate stage to group the data by their maker.Add an accumulator with a field named lowest_level that finds the lowest level_required per maker.

A: db.wands.aggregate([
  {"$match": {"powers": "Air Bolt"}},
  {"$group": {"_id": "$maker", "lowest_level": {"$min": "$level_required"}}}
]);



5.9 Budget Castings 250 PTS
A user has asked us to find out which makers have wands that are under 50 gems and have a damage.magic average above 40.
Write an aggregate to match wands that have a price that is less than 50.Add the aggregate stage to group the wands by their maker.Add an accumulator with a field named average_magic to find the average damage.magic per maker using the $avg accumulator.Now that we've got our data all set, let's filter it down further.Below the existing $match and $group aggregates, add another $match aggregate so that we're only retrieving results with an average_magic that is greater than 40.

A: db.wands.aggregate([
  {"$match": {"price": {"$lt": 50}}},
  {"$group": {"_id": "$maker", "average_magic": {"$avg": "$damage.magic"}}},
  {"$match": {"average_magic": {"$gt": 40}}}
]);

5.10 Clairvoyant Decisions 250 PTS
We're always on the lookout for the best wand for its value. Let's find out the top 5 makers that offer the most magic damage for a wand in our level range.
Write an aggregate that finds wands that have a level_required that's less than or equal to 5.Add the aggregate stage to group the wands by their maker.Add an accumulator with the field max_damage that finds the max damage.magic per maker.Now that we have the bulk of our data, let's go ahead and sort the max_damage in descending order.Add a limit stage so that we only find the first 4 results. After all, we don't have all day to look through wands!There's one more stage we can add to our pipeline to make sure it's fully optimized. Since we only need the maker and damage.magic fields, add a $project stage that only passes those fields along to the rest of operators.Remember, where you place this is important



A: db.wands.aggregate([
  {"$match": {"level_required": {"$lt": 5}}},
  {"$project": {"maker": true, "damage.magic": true, "_id": false}},
  {"$group": {"_id": "$maker", "max_damage": {"$max": "$damage.magic"}}},
  {"$sort": {"max_damage": -1}},
  {"$limit": 4}
]);
