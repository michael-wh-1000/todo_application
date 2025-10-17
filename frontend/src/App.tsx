import "./App.css";

import { useEffect, useState } from "react";
import { type todoItem } from "./lib/types";
import { TodoItem } from "./components/todoItem";
import { CreateTask } from "./components/createTask";
import { Search } from "./components/search";

function App() {
  const [todoList, setTodoList] = useState<todoItem[]>([]);
  const [showList, setShowList] = useState<todoItem[]>([]);
  const [searchItem, setSearchItem] = useState("");

  console.log(todoList);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/todos");
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodoList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (searchItem.trim() === "") {
      setShowList(todoList);
    } else {
      const filtered = todoList.filter((item) =>
        item.text.toLowerCase().includes(searchItem.toLowerCase())
      );
      setShowList(filtered);
    }
  }, [searchItem, todoList]);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center justify-center pt-[50px] gap-[30px] text-textColor w-full max-w-[450px]">
          <div className="w-full my-[10px]">
            <h1 className="text-[35px] font-bold text-mutedTextColor/90">
              To Do Application
            </h1>
          </div>
          <div className="flex items-center w-full  justify-between gap-[20px]">
            <Search searchItem={searchItem} setSearchItem={setSearchItem} />
            <CreateTask todoList={todoList} setTodoList={setTodoList} />
          </div>
          <div className="flex flex-col gap-[10px]">
            {showList.map((todo) => (
              <TodoItem
                itemId={todo.id}
                text={todo.text}
                completed={todo.completed}
                todoList={todoList}
                setTodoList={setTodoList}
                showList={showList}
                setShowList={setShowList}
                key={todo.id}
              />
            ))}
          </div>
          <span className="font-medium">
            <i>Your remaining todos: </i>
            {todoList.filter((todo) => todo.completed !== true).length}
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
