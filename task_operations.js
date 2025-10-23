import { generateTaskId, getCurrentDateTime, isExistingId, isValidId, loadTasks, saveTasks } from "./helper.js"

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

function updateTask(id, description){
  const tasks = loadTasks()
  const validId = isValidId(id);
  if(!validId){
    console.error(`${id} is not a valid ID`)
    return
  }
  const taskId = parseInt(id);

  const existingId = isExistingId(taskId, tasks)
  if(!existingId){
    console.error(`Task with ID:${taskId} does not exist`)
    return
  }

  tasks[taskId - 1].description = description;
  tasks[taskId - 1].updatedAt = getCurrentDateTime();

  if(saveTasks(tasks)){
		console.log(`Task ${taskId} updated successfully`);
	} else {
		console.error('Failed to update task');
	}
}




export {
  addTask,
  updateTask
}