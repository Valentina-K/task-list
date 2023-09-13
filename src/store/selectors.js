export const getTasks = (state) => state.tasks;

export const getNotDoneTasks = (state) => {
  const notDoneTesks = state.tasks.filter((task) => !task.status);
  return notDoneTesks.length;
};
