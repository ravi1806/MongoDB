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
