import readline from "node:readline";
import { addTask, updateTask, deleteTask, markprogress, markdone, marktodo, listTask } from "./taskService.js";
import { autocomplete } from "./autocomplete.js";
import { parsecommande } from "./parser.js";

function main() {
	const rl = readline.createInterface({
  		input: process.stdin,
  		output: process.stdout,
		prompt: "> ",
		completer: autocomplete,
	});
	
	console.log('Type "help" to display the available commands.');

	console.log('Type "exit" to quit.');

  	rl.prompt(); // display the prompt
	
	// run this everytime I type return
	rl.on("line", input => {
		const commandInput = input.trim();// delete space at the beginning and the end

		// Leave the program if user type exit
		if (commandInput === "exit"){
			console.log("Goodbye!");
			rl.close();
			return;
		}

		// If the user accidentally presses Enter without typing anything, display the prompt again.
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
