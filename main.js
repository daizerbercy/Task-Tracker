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

// modification a faire ici
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

// Surement à revoir
function listTask(){
	for(let i=0; i < Tasks.length; i++){
		console.log(Tasks[i]);
	}
}


function listTaskmark(mark){
	// we ensure that mark has the right syntax
	switch(mark) {
		case "in-progress":
			break;
		case "done":
			break;
		case "todo":
			break;
		default:
			throw new Error("Wrong status for the task");
	}

	for(let i=0; i < Tasks.length; i++){
		if( Tasks[i].state == mark){
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

		
	throw new Error(
    		"Format invalide.\n" +
      		"Utilisation :\n" +
      		'  add "task description"\n' +
    		'  update {id} "task description"\n' +
      		"  delete {id}\n" +
      		"  mark-in-progress {id}\n" +
      		"  mark-done {id}\n" +
		"  mark-todo {id}\n" +
      		"  list\n" +
      		"  list done\n" +
      		"  list todo\n" +
      		"  list in-progress"
  	);
}


function main() {
	const rl = readline.createInterface({
  		input: process.stdin,
  		output: process.stdout,
	});

	rl.question(`> `, input => {
		try {
  			const command = parsecommande(input);
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
		
				/*case "mark-in-progress":
				markTask(Number([1]),parsechoose[0]);
				break;
		
				case "mark-done":
				markTask(Number(parsechoose[1]),parsechoose[0]);
				break;
	
				case "mark-todo":
				markTask(Number(parsechoose[1]),parsechoose[0]);
				break;
		
				case "list":
				listTaskmark(parsechoose[1]);
				break;*/
				
				case "help":
				console.log(
'# Adding a new task\ntask-cli add "Buy groceries"\n# Output: Task added successfully (ID: 1)\n\n# Updating and deleting tasks\ntask-cli update 1 "Buy groceries and cook dinner"\ntask-cli delete 1\n\n# Marking a task as in progress or done\ntask-cli mark-in-progress 1\ntask-cli mark-done 1\n\n# Listing all tasks\ntask-cli list\n\n# Listing tasks by status\ntask-cli list done\ntask-cli list todo\ntask-cli list in-progress'
				);
				break;

				default:
				console.log(
				"Commandes disponibles : add, update, delete, mark-in-progress, mark-done, mark-todo, list, list done, list todo, list in-progress"
				);
			
			}
		} catch (err) {
			console.error(err.message);
		} finally {
			rl.close();
		}
	});
}

main();
