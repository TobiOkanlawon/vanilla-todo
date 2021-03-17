import PubSub from "pubsub-js";
import createTask from "./task";

(function () {
  const projects = document.getElementById("projects");
  const tasksContainer = document.getElementById("task-list");
  const addTaskForm = document.getElementById("add-task-form");

  const ADD_TASK = "task added";
  const TASK_LIST = "render task list";
  const DELETE_TASK = "delete task";

  const init = function () {
    bindDOMEvents();
    subscribeToEvents();
  };

  const bindDOMEvents = function () {
    // Should this really be a function
    addTaskForm.addEventListener("submit", (e) => handleAddTask(e));
  };

  const subscribeToEvents = function () {
    // I apologize for the bad naming
    PubSub.subscribe(TASK_LIST, renderTaskList);
  };

  const handleAddTask = function (e) {
    e.preventDefault();

    const task = createTask(addTaskForm["new-task"].value);
    PubSub.publish(ADD_TASK, task);
    addTaskForm.reset();
  };

  const handleDelete = function (id) {
    // get the element's data-id with the e argument
    PubSub.publish(DELETE_TASK, id);
  };

  const createTaskElementFactory = function (id, title) {
    const taskElementContainer = document.createElement("div");
    taskElementContainer.classList.add("task-container");

    taskElementContainer.setAttribute("data-id", id);

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = title;

    const deleteButton = document.createElement("span");
    deleteButton.innerText = "delete me";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", (e) => handleDelete(e, id));

    taskElementContainer.appendChild(taskTitle);
    taskElementContainer.appendChild(deleteButton);
    return taskElementContainer;
  };

  const renderTaskList = function (_, list) {
    // set the project name here too.
    tasksContainer.innerText = "";
    for (const { id, task } of list) {
      // should probably create a factory function for creating task elements
      const taskElement = createTaskElementFactory(id, task.title);
      tasksContainer.appendChild(taskElement);
    }
  };

  init();
})();
