import PubSub from "pubsub-js";
import createTask from "./task";
import "./taskList";

// contains the user interface
(function () {
  const projects = document.getElementById("projects");
  const taskList = document.getElementById("task-list");
  const addTaskForm = document.getElementById("add-task-form");

  const TASK_ADDED_TOPIC = "task added";

  const bindEvents = function () {
    // Should this really be a function
    addTaskForm.addEventListener("submit", (e) => handleAddTask(e));
  };

  const handleAddTask = function (e) {
    e.preventDefault();

    const formData = new FormData(addTaskForm);

    const task = createTask({ title: formData.newTask });
    PubSub.publish(TASK_ADDED_TOPIC, task);
    clearAddTaskForm();
  };

  const clearAddTaskForm = () => {
    addTaskForm.reset();
  };

  bindEvents();
})();
