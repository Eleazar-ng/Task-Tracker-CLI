#!/usr/bin/env node
import { showHelp } from "./helper.js";
import { addTask } from "./task_operations.js";

// Valid Commands
const commands = [
  "add", "update", "delete", "mark-in-progress", "mark-done", "list"
];

// Main Function
function main() {
  const args = process.argv.slice(2);
  if(args.length === 0){
    showHelp();
    return
  }

  const command = args[0].toLowerCase();

  try {
    switch(command){
      case 'add':
        if(args.length < 2){
					console.error('Description is required for adding a task');
				}
        console.log(args)
        const description = args.slice(1).join(' ');
        addTask(description);
        break;
      default:
        console.error(`${command} is not a valid command`);
        break; 
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

}


main()


