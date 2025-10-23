
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Task JSON File
const TASKS_FILE = path.join(__dirname, 'tasks.json');

function showHelp(){
  console.log(
    `
    *******  Welcome To Task Tracker CLI  *******

    A cli application to track your task and manage your to-do list

    USAGE:
      task-cli <command> [arguments]

    COMMANDS:
      add <description>           Add a new task
      update <id> <description>   Update a task description
      delete <id>                 Delete a task
      mark-in-progress <id>       Mark task as in progress
      mark-done <id>              Mark task as done
      list [status]               List all tasks or filter by status
                                   (status: todo, in-progress, done)

    EXAMPLES:
      task-cli add "Buy groceries"
      task-cli update 1 "Buy groceries and cook dinner"
      task-cli delete 1
      task-cli mark-in-progress 1
      task-cli mark-done 1
      task-cli list
      task-cli list done
      task-cli list todo
      task-cli list in-progress                             
    `
  )

	return 
}

function loadTasks(){
  try {
    if (!fs.existsSync(TASKS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
      console.error('Error loading tasks:', error.message);
      return [];
  }
}

function generateTaskId(tasks){
  if (tasks.length === 0) return 1;
	return Math.max(...tasks.map(task => task.id)) + 1;
}

function getCurrentDateTime(){
  return new Date().toISOString();
}

function saveTasks(tasks){
	try {
		fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
		return true;
	} catch (error) {
		console.error('Error saving tasks:', error.message);
		return false;
	}
}



export {
  showHelp,
  loadTasks,
  generateTaskId,
  getCurrentDateTime,
  saveTasks
}