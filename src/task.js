const createTask = function (
  title,
  desc = "",
  dueDate = false,
  priority = 1,
  checklist = []
) {
  return { title, desc, priority, dueDate, checklist, done: false };
};

export default createTask;
