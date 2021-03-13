import PubSub from "pubsub-js";

// storage is a module with the methods:

// add(id, item)
// remove(id, item)
// flush()

(function () {
  const testStorage = [];
  let token;

  const TASK_ADDED_TOPIC = "task added";
  const TASK_LIST = "render task list";

  const init = function () {
    token = PubSub.subscribe(TASK_ADDED_TOPIC, handleTaskAdded);
  };

  const handleTaskAdded = function (_, task) {
    // _ is the topic from PubSub
    testStorage.push(task);
    PubSub.publish(TASK_LIST, testStorage);
  };

  init();
})();
