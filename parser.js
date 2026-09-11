// function for the parsing and syntax error management
export function parsecommande(input){
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
	
	// help
	match = input.match(/^\s*help\s*$/);

	if (match) {
		return ["help"];
	}
		
	throw new Error(
		"Unknown command. Type help to see the available commands."
  	);
}
