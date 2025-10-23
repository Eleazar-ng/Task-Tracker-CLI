import { generateTaskId, getCurrentDateTime, loadTasks, saveTasks } from "./helper.js"

function addTask(description) {
  const tasks = loadTasks()
  const newTaskId = generateTaskId(tasks);

  const newTask = {
    id: newTaskId,
		description: description,
		status: "todo",
		createdAt: getCurrentDateTime(),
		updatedAt: getCurrentDateTime(),
  }

  tasks.push(newTask);

	if (saveTasks(tasks)) {
			console.log(`Task added successfully (ID: ${newTask.id})`);
	} else {
			console.error('Failed to add task');
	}
}




export {
  addTask
}