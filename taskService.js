import Task from "./taskModel.js";
import { saveTasks, loadTasks } from "./taskStore.js";

let Tasks = loadTasks();

export function findIndexById(id){
	
	if (!Number.isInteger(id) || id <= 0) {
    		throw new Error("The task ID must be a positive integer");
  	}
	
	const index = Tasks.findIndex(task => task.id === id);

	if(!Tasks[index]) {
		throw new Error(`Task with ID ${id} was not found.`);
	}
	
	return index;
}

export function addTask(descr) {
	// we check the ID	
	let lastID = 0;
	if( Tasks.length > 0){	
		lastID = Tasks[Tasks.length - 1].id;
	}
	
	const date = new Date();
		
	const formatdate = date.toLocaleString();	
	
	const newtask = new Task(lastID + 1, descr, "todo", formatdate, formatdate);
	
	Tasks.push(newtask); //we add the new task in the table

	saveTasks(Tasks);

	console.log("Task added successfully (ID: " + newtask.id + ")");
}


export function updateTask(id, descr) {
	const position = findIndexById(id);

	const date = new Date();
	const formatdate = date.toLocaleString();
	
	Tasks[position].description = descr;
	Tasks[position].updateAt = formatdate;

	saveTasks(Tasks);
	
	console.log("Task updated Successfully (ID: " + id + ")");
}



export function deleteTask(id) {
	const position = findIndexById(id);

	Tasks.splice(position,1); // delete an element in a table
	
	saveTasks(Tasks);
	
	console.log("Task deleted Successfully (ID: " + id + ")");
}


export function markprogress(id) {
	const position = findIndexById(id);

	Tasks[position].state = "in-progress";
	
	saveTasks(Tasks);
	
	console.log("Task mark in-progress Successfully (ID: " + id + ")");
}

export function markdone(id) {
	const position = findIndexById(id);

	Tasks[position].state = "done";
	
	saveTasks(Tasks);
	
	console.log("Task mark done Successfully (ID: " + id + ")");
}

export function marktodo(id) {
	const position = findIndexById(id);

	Tasks[position].state = "todo";
	
	saveTasks(Tasks);
	
	console.log("Task mark todo Successfully (ID: " + id + ")");
}


export function listTask(mark){
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
