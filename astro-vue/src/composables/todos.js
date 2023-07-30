export const updateTodo = (todos, id) => {
  const todo = todos.find((todo) => todo.id === id);
  const newValue = !todo.done;
  const update = fetch(
    `https://jonknoll.dev/wp-json/todo/v1/update/?id=${id}&done=${newValue}`
  ).then((res) => res.json());

  return todos.map((todo) => {
    if (todo.id === id) {
      todo.done = newValue;
    }
    return todo;
  });
};

export const removeTodo = async (todos, id) => {
  const remove = await fetch(
    `https://jonknoll.dev/wp-json/todo/v1/remove/?id=${id}`
  ).then((res) => res.json());

  console.log(`🍤 ~ removeTodo ~ remove:`, remove);
  todos = todos.filter((todo) => todo.id !== id);

  console.log(`🍤 ~ removeTodo ~ todos:`, todos);
  return todos;
};

export const addTodo = async (todos, title) => {
  const add = await fetch(
    `https://jonknoll.dev/wp-json/todo/v1/add/?title=${title}`
  ).then((res) => res.json());
  todos = [{ id: add.id, title: add.title, done: false }, ...todos];
  return todos;
};
