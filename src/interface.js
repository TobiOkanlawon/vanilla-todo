import PubSub from "pubsub-js";
import createTask from "./task";

(function () {
  const projects = document.getElementById("projects");
  const taskList = document.getElementById("task-list");
  const addTaskForm = document.getElementById("add-task-form");

  const TASK_ADDED_TOPIC = "task added";
  const TASK_LIST = "render task list";

  const bindDOMEvents = function () {
    // Should this really be a function
    addTaskForm.addEventListener("submit", (e) => handleAddTask(e));
  };

  const subscribeToEvents = function () {
    // I apologize for the bad naming
    PubSub.subscribe(TASK_LIST, renderTaskList);
  };

  const init = function () {
    bindDOMEvents();
    subscribeToEvents();
  };

  const handleAddTask = function (e) {
    e.preventDefault();

    const task = createTask(addTaskForm["new-task"].value);
    PubSub.publish(TASK_ADDED_TOPIC, task);
    addTaskForm.reset();
  };

  const createTaskElementFactory = function (title) {
    const taskElementContainer = document.createElement("div");
    taskElementContainer.classList.add("task-container");

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = title;

    taskElementContainer.appendChild(taskTitle);
    return taskElementContainer;
  };

  const renderTaskList = function (_, list) {
    // set the project name here too.
    taskList.innerText = "";
    for (const item of list) {
      // should probably create a factory function for creating task elements
      const task = createTaskElementFactory(item.title);
      taskList.appendChild(task);
    }
  };

  init();
})();
