import PubSub from "pubsub-js";

// storage is a module with the methods:

// add(id, item)
// remove(id, item)
// flush()

(function () {
  let testStorage = [];

  let idCounter = 0;

  const ADD_TASK = "task added";
  const TASK_LIST = "render task list";
  const DELETE_TASK = "delete task";

  const init = function () {
    // TODO: Check for app data from localStorage before app starts
    // TODO: Consider not storing the tokens.
    const addTaskToken = PubSub.subscribe(ADD_TASK, handleAddTask);
    const deleteTaskToken = PubSub.subscribe(DELETE_TASK, handleDeleteTask);
  };

  const incrementCounter = function () {
    idCounter++;
  };

  const getCount = function () {
    return idCounter;
  };

  const _getTask = function (taskID) {
    // returns an object that is the task with the id or false;

    const [task] = testStorage.filter(({ entryID }) => {
      entryID == taskID;
    });
    return task || false;
  };

  const _removeTask = function (taskID) {
    const newTaskList = testStorage.filter(({ id }) => {
      return id != taskID;
    });

    testStorage = newTaskList;
  };

  const handleAddTask = function (_, task) {
    // _ is the topic from PubSub
    testStorage.push({ id: getCount(), task });
    incrementCounter();
    PubSub.publish(TASK_LIST, testStorage);
  };

  const handleDeleteTask = function (_, id) {
    _removeTask(id);

    PubSub.publish(TASK_LIST, testStorage);
  };

  init();
})();
