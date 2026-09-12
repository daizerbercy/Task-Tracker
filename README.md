# Task Tracker CLI

A simple command-line task tracker built with JavaScript and Node.js.

This project was inspired by the [Task Tracker CLI project from roadmap.sh](https://roadmap.sh/projects/task-tracker). It allows users to create, update, delete, list, and manage tasks directly from the terminal.

I also added command autocompletion to make the CLI easier and faster to use.

## Features

- Add new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as todo
- Mark tasks as in-progress
- Mark tasks as done
- List all tasks
- Filter tasks by status
- Display available commands with `help`
- Exit the application with `exit`
- Autocomplete commands with the `Tab` key
- Interactive command-line interface

## Available Commands

```text
add "task description"
```
Add a new task.

```text
update {id} "task description"
```
Update the description of an existing task.

```text
delete {id}
```
Delete a task using its ID.

```text
mark-in-progress {id}
```
Mark a task as in progress.

```text
mark-done {id}
```
Mark a task as done.

```text
mark-todo {id}
```
Mark a task as todo.

```text
list
```
Display all tasks.

```text
list done
```
Display only completed tasks.

```text
list todo
```
Display only todo tasks.

```text
list in-progress
```
Display only tasks that are currently in progress.

```text
help
```
Display the list of available commands.

```text
exit
```
Exit the application.

## Autocompletion
The CLI supports autocompletion using the Tab key.

For example, typing:
```text
mark-
```
and pressing Tab can suggest:

```text
mark-in-progress
mark-done
mark-todo
```

It also supports autocompletion for task statuses:

```text
list d
```

Pressing Tab completes the command to:
```text
list done
```

The autocompletion is implemented with Node.js's built-in readline module.

## Installation

Clone the repository:
```bash
git clone https://github.com/daizerbercy/Task-Tracker.git
```
Move into the project directory:
```bash
cd Task-Tracker
```
No external dependencies are required if the project only uses built-in Node.js modules.

## Running the Application

Start the application with:
```bash
node main.js
```

You should see:
```text
Type "help" to display the available commands.
Type "exit" to quit.
>
```

You can then enter a command.

## Goals of the Project

This project was created to practice:
- JavaScript fundamentals
- Node.js
- The readline module
- Regular expressions
- Command parsing
- Functions and switch statements
- Arrays and objects
- File handling
- Building interactive CLI applications

## Future Improvements
Possible improvements :
- [ ] Add autocompletion for task IDs
- [ ] Add confirmation before deleting a task
- [ ] Add search functionality
- [ ] improve error messages
- [ ] Add automated tests
