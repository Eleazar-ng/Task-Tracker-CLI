#!/usr/bin/env node
import { showHelp } from "./helper.js";
import { addTask, updateTask } from "./task_operations.js";

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
          return
				}
        const description = args.slice(1).join(' ');
        addTask(description);
        break;
      
      case 'update':
        if(args.length < 3){
          console.error(`Task Id and description are required for updating a task`)
				  return
        }
        const id = args[1]
        const newDescription = args.slice(2).join(' ');
        updateTask(id, newDescription)
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


