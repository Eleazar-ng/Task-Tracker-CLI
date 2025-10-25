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

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  tasks[taskIndex].description = description;
  tasks[taskIndex].updatedAt = getCurrentDateTime();

  if(saveTasks(tasks)){
		console.log(`Task ${taskId} updated successfully`);
	} else {
		console.error('Failed to update task');
	}
}

function deleteTask(id){
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

  const filteredTasks = tasks.filter(task => task.id !== taskId)

  if(saveTasks(filteredTasks)){
		console.log(`Task ${taskId} deleted successfully`);
	} else {
		console.error('Failed to delete task');
	}
}

function markTaskStatus(id, status){
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

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  tasks[taskIndex].status = status;
  tasks[taskIndex].updatedAt = getCurrentDateTime();

  if(saveTasks(tasks)){
		console.log(`Task ${taskId} status updated successfully`);
	} else {
		console.error('Failed to update task');
	}

}

function listTasks(status = null){
  const tasks = loadTasks();
  if(tasks.length === 0){
    console.log('No tasks were found');
    return
  }

  if(!status){
    console.log(`******** Tasks *******`)
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. TaskID: ${task.id}, Desc: ${task.description}, Status: ${task.status}, Created: ${task.createdAt}`)
    });
    return
  }

  const filteredTasks = tasks.filter(task => task.status == status);
  if(filteredTasks.length === 0){
    console.log(`No ${status} tasks were found`);
    return
  } else {
    console.log(`******** ${status} tasks *******`)
    filteredTasks.forEach((task, index) => {
      console.log(`${index + 1}. TaskID: ${task.id}, Desc: ${task.description}, Status: ${task.status}, Created: ${task.createdAt}`)
    })
    return
  }
}

export {
  addTask,
  updateTask,
  deleteTask,
  markTaskStatus,
  listTasks
}