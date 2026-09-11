// Arrays for autocomplete
const commands = [
	"add",
	"update",
	"delete",
	"mark-in-progress",
	"mark-todo",
	"mark-done",
	"list",
	"help",
	"exit",
];

const liststatus = [
	"done",
	"todo",
	"in-progress",
];

// function for autocomplete
export function autocomplete(line){
	const input = line.trimStart(); // remove whitespace form beginning
	// Only autocomplete the main command before the user types an argument
	if(!input.includes(" ")){
		const matches = commands.filter(command => command.startsWith(input));

		return [input.length > 0 ? matches : commands, line]; 
	}
	// (/S*) capture zero or more non-whitespace characters in listmathch[1]
	const listmatch = input.match(/^\s*list\s+(\S*)$/);
	
	if(listmatch) {
		const partialstatus = listmatch[1];
	
		const matches = liststatus
			.filter( command => command.startsWith(partialstatus))
			.map( command => `list ${command}`);

		return [matches, line];
	}

	return [[],line];
}
