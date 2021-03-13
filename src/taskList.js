import PubSub from "pubsub-js";

// storage is a module with the methods:

// add(id, item)
// remove(id, item)
// flush()

(function () {
  const testStorage = [];
  let token;

  const init = function () {
    token = PubSub.subscribe("task added", handleTaskAdded);
  };

  const handleTaskAdded = function (msg, task) {
    testStorage.push(task);
    console.log(msg);
    console.log(testStorage);
  };

  init();
})();
// export default subscribe;
