// import file system (fs) for node.js
const fs = require('fs');
// import readline for input and output on node.js
const readline = require("node:readline");

//I view a task as an object
function Task(identify,desc, statement, creation_date, lastupdate_date){
	this.id = identify;
	this.description = desc;
	this.state = statement;
	this.createdAt = creation_date;
	this.updateAt = lastupdate_date;
} 
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
	
	let lastID = 0;
	if( Tasks.length > 0){	
		lastID = Tasks[Tasks.length - 1].id;
	}
	
	const newtask = new Task(lastID + 1, descr, "todo", new Date(),new Date());
	
	try {
		Tasks.push(newtask); //we add the new task in the table
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8"); // we update the data.json file

		console.log("Task added successfully (ID: " + newtask.id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}


// now I want that the creation date stay fixe and that the update date do nearly the same
// This problem will be resolve by the json file.

function updateTask(id, descr) {

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


// now I want to delete a Task

function deleteTask(id) {

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

	try {
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8");
		
		console.log("Task deleted Successfully (ID: " + id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}


function markprogress(id) {

	if (!Number.isInteger(id) || id <= 0) {
    		throw new Error("The task ID must be a positive integer");
  	}
	let position;
	
	for(let i=0; i< Tasks.length; i++){
		if (Tasks[i].id == id){
			position = i;
		}
	}


	if(!Tasks[position]){
		throw new Error("This ID doesn't exist");
	}

	Tasks[position].state = "in-progress";

	try {
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8");
		
		console.log("Task mark in-progress Successfully (ID: " + id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}

function markdone(id) {

	if (!Number.isInteger(id) || id <= 0) {
    		throw new Error("The task ID must be a positive integer");
  	}
	let position;
	
	for(let i=0; i< Tasks.length; i++){
		if (Tasks[i].id == id){
			position = i;
		}
	}


	if(!Tasks[position]){
		throw new Error("This ID doesn't exist");
	}

	Tasks[position].state = "done";

	try {
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8");
		
		console.log("Task mark done Successfully (ID: " + id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}

function marktodo(id) {

	if (!Number.isInteger(id) || id <= 0) {
    		throw new Error("The task ID must be a positive integer");
  	}
	let position;
	
	for(let i=0; i< Tasks.length; i++){
		if (Tasks[i].id == id){
			position = i;
		}
	}


	if(!Tasks[position]){
		throw new Error("This ID doesn't exist");
	}

	Tasks[position].state = "todo";

	try {
		fs.writeFileSync("data.json",JSON.stringify(Tasks, null, 2), "utf8");
		
		console.log("Task mark todo Successfully (ID: " + id + ")");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}


function listTask(mark){
	if (mark === "todo" || mark === "in-progress" || mark === "done") {
		for(let i=0; i < Tasks.length; i++){
			if( Tasks[i].state == mark){
				console.log(Tasks[i]);
			}
		}
	} else {
		for(let i=0; i < Tasks.length; i++){
			console.log(Tasks[i]);
		}
	}
}


// Function for the parsing and syntax error management
function parsecommande(input){
	// add "description"
	let match = input.match(/^\s*add\s+"([^"]+)"\s*$/);
		
	if(match) {
		return ["add", match[1]];
	}

	// update id "description"
	match = input.match(/^\s*update\s+(\d+)\s+"([^"]+)"\s*$/);
	
	if(match) {
		return ["update", Number(match[1]), match[2]];
	}
		
	// delete id
	match = input.match(/^\s*delete\s+(\d+)\s*$/);

	if(match) {
		return ["delete", Number(match[1])];
	}

	// mark-in-progress id
	match = input.match(/^\s*mark-in-progress\s+(\d+)\s*$/);
		
	if(match) {
		return ["mark-in-progress", Number(match[1])];
	}
		
	// mark-done id
	match = input.match(/^\s*mark-done\s+(\d+)\s*$/);

	if(match) {
		return ["mark-done", Number(match[1])];
	}

	// mark-todo id
	match = input.match(/^\s*mark-todo\s+(\d+)\s*$/);

	if(match) {
		return ["mark-todo", Number(match[1])];
	}

	// list or list status
	match = input.match(/^\s*list(?:\s+(done|todo|in-progress))?\s*$/);
	if(match) {
		return ["list", match[1] || "all"];
	}

	match = input.match(/^\s*help\s*$/);

	if (match) {
		return ["help"];
	}
		
	throw new Error(
		"Unknown command. Type help to see the available commands."
  	);
}


function main() {
	const rl = readline.createInterface({
  		input: process.stdin,
  		output: process.stdout,
		prompt: "> ",
	});
	
	console.log('Type "help" to display the available commands.');

	console.log('Type "exit" to quit.');

  	rl.prompt();
	
	rl.on("line", input => {
		const commandInput = input.trim();

		// Leave the program
		if (commandInput === "exit"){
			console.log("Goodbye!");
			rl.close();
			return;
		}

		// Ignore empty line
		if (commandInput === "") {
      			rl.prompt();
      			return;
    		}		

		try {
  			const command = parsecommande(commandInput);
			console.log(command); // debugging
	
			switch(command[0]) {
				case "add": 
				addTask(command[1]);
				break;
		
				case "update":
				updateTask(command[1],command[2]);
				break;
		
				case "delete":
				deleteTask(command[1]);
				break;
		
				case "mark-in-progress":
				markprogress(command[1]);
				break;
		
				case "mark-done":
				markdone(command[1]);
				break;
	
				case "mark-todo":
				marktodo(command[1]);
				break;
		
				case "list":
				listTask(command[1]);
				break;
				
				case "help":
				console.log(
					'Available commands :\n' +
            				'  add "description"\n' +
            				'  update {id} "description"\n' +
            				'  delete {id}\n' +
            				'  mark-in-progress {id}\n' +
            				'  mark-done {id}\n' +
            				'  mark-todo {id}\n' +
            				'  list\n' +
            				'  list done\n' +
            				'  list todo\n' +
            				'  list in-progress\n' +
            				'  help\n' +
            				'  exit'
				);
				break;
			}
		} catch (err) {
			console.error(err.message);
		}
		
		rl.prompt();
	});

	rl.on("close", () => {
		console.log("Program terminated.");
	});
}

main();
