import fs from "fs";
const filePath = "data.json";

export function loadTasks() {

	if(!fs.existsSync(filePath)) {
		return [];
	}

	const tasks = JSON.parse(fs.readFileSync("data.json", "utf8"));
	
	if (!Array.isArray(tasks)){
		throw new Error("the JSON file must contains an array.");
	}
	return tasks;
}


export function saveTasks(tasks) {

	try {
		fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf8");
	} catch (err) {
		console.error('Error writing files:', err);
	}
}
