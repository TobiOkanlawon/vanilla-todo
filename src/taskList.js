import PubSub from "pubsub-js";

// storage is a module with the methods:

// add(id, item)
// remove(id, item)
// flush()

(function () {
  const testStorage = [];
  let token;

  let idCounter = 0;

  const TASK_ADDED_TOPIC = "task added";
  const TASK_LIST = "render task list";

  const init = function () {
    token = PubSub.subscribe(TASK_ADDED_TOPIC, handleTaskAdded);
  };

  const incrementCounter = function () {
    idCounter++;
  };

  const getCount = function () {
    return idCounter;
  };

  const _getTask = function (taskID) {
    // returns an object that is the task with the id or false;

    // This assumes that there would be only one of the same ID.
    // And that is in face a false assumption, because of deletion and insertion.
    const [task] = testStorage.filter(({ entryID }) => {
      entryID == taskID;
    });
    return task || false;
  };

  const handleTaskAdded = function (_, task) {
    // _ is the topic from PubSub
    testStorage.push({ id: getCount, task });
    incrementCounter();
    console.log(testStorage);
    PubSub.publish(TASK_LIST, testStorage);
  };

  init();
})();
