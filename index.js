#!/usr/bin/env node
import { showHelp } from "./helper.js";
import { addTask, deleteTask, listTasks, markTaskStatus, updateTask } from "./task_operations.js";

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

  let id
  let description

  try {
    switch(command){
      case 'add':
        if(args.length < 2){
					console.error('Description is required for adding a task');
          return
				}
        description = args.slice(1).join(' ');
        addTask(description);
        break;
      
      case 'update':
        if(args.length < 3){
          console.error(`Task Id and description are required for updating a task`)
				  return
        }
        id = args[1]
        description = args.slice(2).join(' ');
        updateTask(id, description)
        break;

      case 'delete':
        if(args.length < 2){
					console.error('Task Id is required for deleting a task');
          return
				}
        id = args[1]
        deleteTask(id);
        break;
        
      case 'mark-in-progress':
        if(args.length < 2){
					console.error('Task Id is required for updating a task status');
          return
				}
        id = args[1]
        markTaskStatus(id, "in-progress")
        break;
        
      case 'mark-done':
        if(args.length < 2){
					console.error('Task Id is required for updating a task status');
          return
				}
        id = args[1]
        markTaskStatus(id, "done")
        break;  

      case 'list': 
        if(args.length < 2){
          listTasks();
				}else {
          const status = args[1].toLowerCase();
          const validStatuses = ['todo', 'in-progress', 'done']
          if(!validStatuses.includes(status)){
            console.error(`${status} is not a valid status`);
            return
          }
          listTasks(status);
        } 
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


