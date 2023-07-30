export async function load({ fetch }) {
  const res = await fetch("https://jonknoll.dev/wp-json/todo/v1/todos");
  const data = await res.json();
  const { todos } = data;

  return { todos };
}
