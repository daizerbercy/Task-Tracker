// import file system (fs) for node.js
const fs = require('fs');

//I view a task as an object
function Task(identify,desc, statement, creation_date, lastupdate_date){
	this.id = identify;
	this.description = desc;
	this.state = statement;
	this.createdAt = creation_date;
	this.updateAt = lastupdate_date;
} 
// il faut revoir la recuperation de la position via l'ID après suppression
// We need a list to manage the task.
// we charge the data.json store inside
let Tasks = [];

if(fs.existsSync("data.json")){
	Tasks = JSON.parse(fs.readFileSync("data.json", "utf8"));
}

// we make sure that Tasks is an array here
if (!Array.isArray(Tasks)){
	throw new Error("the JSON file must contains an array.");
}


function addTask(descr) {
	// we make sure he have the right ID	
	const lastID = Tasks[Tasks.length - 1].id;
	const newtask = new Task(lastID + 1, descr, "todo", new Date(),new Date());
	
	try {
		Tasks.push(newtask); //we add the new task in the table
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8"); // we update the data.json file

		console.log("Task added successfully (ID: " + newtask.id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}

//addTask("Buy groceries");

// now I want that the creation date stay fixe and that the update date do nearly the same
// This problem will be resolve by the json file.

function updateTask(id, descr) {
	if(Tasks.length === 0){
		throw new Error("There are no tasks created");
	}

	  if (!Number.isInteger(id) || id <= 0) {
    		throw new Error("The task ID must be a positive integer");
  	}
	
//	const position = id - 1;
	let position;
	
	for(let i=0; i< Tasks.length; i++){
		if (Tasks[i].id == id){
			position = i;
		}
	}

	if(!Tasks[position]){
		throw new Error("This ID doesn't exist");
	}
	
	Tasks[position].description = descr;
	Tasks[position].updateAt = new Date();
	
	try {
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8");
		
		console.log("Task updated Successfully (ID: " + id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
		
}

// must be call with a try catch statement to avoid the complet errorœ
//updateTask(50, "Cook dinner");

// now I want to delete a Task

function deleteTask(id) {
	if(Tasks.length === 0){
		throw new Error("There are no tasks created");
	}

	  if (!Number.isInteger(id) || id <= 0) {
    		throw new Error("The task ID must be a positive integer");
  	}
	
	//const position = id - 1;
	// find another way to get the position
	let position;
	
	for(let i=0; i< Tasks.length; i++){
		if (Tasks[i].id == id){
			position = i;
		}
	}

	if(!Tasks[position]){
		throw new Error("This ID doesn't exist");
	}

	Tasks.splice(position,1); // delete an element in a table
	
	/* function update the id in the files json to avoid problem
	for(let i=0; i< Tasks.length; i++){
		Tasks[i].id = i+1;
	}*/

	try {
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8");
		
		console.log("Task deleted Successfully (ID: " + id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}

//deleteTask(3);

function markTask(id,mark) {
	if(Tasks.length === 0){
		throw new Error("There are no tasks created");
	}

	  if (!Number.isInteger(id) || id <= 0) {
    		throw new Error("The task ID must be a positive integer");
  	}
	let position;
	
	for(let i=0; i< Tasks.length; i++){
		if (Tasks[i].id == id){
			position = i;
		}
	}

//	const position = id - 1;

	if(!Tasks[position]){
		throw new Error("This ID doesn't exist");
	}
	
	/*if (mark != "mark-in-progress" && mark != "mark-done" && mark != "mark-todo"){
		throw new Error("Wrong status for marking tasks");
	}*/

	switch(mark) {
		case "mark-in-progress":
			Tasks[position].state = "in-progress";
			break;
		case "mark-done":
			Tasks[position].state = "done";
			break;
		case "mark-todo":
			Tasks[position].state = "todo";
			break;
		default:
			throw new Error("Wrong status for marking tasks");
	}

	try {
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8");
		
		console.log("Task mark "+ Tasks[position].state +" Successfully (ID: " + id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}

markTask(2,"mark-done");

function listTask(){
	for(let i=0; i < Tasks.length; i++){
		console.log(Tasks[i]);
	}
}

//listTask();

function listTaskmark(mark){
	for(let i=0; i < Tasks.length; i++){
		if( Tasks[i].state == mark){
			console.log(Tasks[i]);
		}
	}
}

listTaskmark("done");
