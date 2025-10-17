import type { todoItem } from "./types";

export const addTodos = async (newTodos: todoItem[]) => {
  console.log("adding todos");
  try {
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodos),
    });

    if (!res.ok) throw new Error("Failed to add todo");
    console.log("added todos");
  } catch (err) {
    console.error(err);
  }
};
