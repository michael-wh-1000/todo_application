import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuPen } from "react-icons/lu";
import type { todoItem } from "../lib/types";
import { HiOutlineTrash } from "react-icons/hi2";
import { addTodos } from "../lib/functions";

export const TodoItem = ({
  itemId,
  todoList,
  setTodoList,
  completed,
  text,
  showList,
  setShowList,
}: {
  itemId: number;
  todoList: todoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<todoItem[]>>;
  completed: boolean;
  showList: todoItem[];
  setShowList: React.Dispatch<React.SetStateAction<todoItem[]>>;
  text: string;
}) => {
  const [itemText, setItemText] = useState(text);
  const [isDone, setIsDone] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newTodoList = todoList.map((todo) => {
        const newItem: todoItem =
          todo.id === itemId
            ? {
                id: itemId,
                text: itemText,
                completed: isDone,
              }
            : todo;

        return newItem;
      });

      try {
        await addTodos(newTodoList);
        setTodoList(newTodoList);
      } catch (error) {
        console.error("Error editing todo", error);
      }

      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const newList = todoList.filter((todo) => todo.id !== itemId);
    const newShowList = showList.filter((todo) => todo.id !== itemId);

    try {
      await addTodos(newList);
      setTodoList(newList);
    } catch (error) {
      console.error("Error editing todo", error);
    }

    setShowList(newShowList);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-start gap-[20px] justify-between w-[450px] bg-mutedBackground/15 rounded-xl p-[15px]">
      <div className="flex items-start gap-[15px] w-full">
        <input
          type="checkbox"
          className="mt-[8px] scale-150"
          checked={isDone}
          onChange={async (e) => {
            const newTodoList = todoList.map((todo) => {
              const newItem: todoItem =
                todo.id === itemId
                  ? {
                      id: itemId,
                      text: itemText,
                      completed: e.target.checked,
                    }
                  : todo;

              return newItem;
            });

            setTodoList(newTodoList);
            setIsDone(e.target.checked);

            try {
              await addTodos(newTodoList);
            } catch (error) {
              console.error("Error editing todo", error);
            }

            // setTodoList(newTodoList);
          }}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={itemText}
            className="w-full border-b-[1px] border-textColor/60 outline-0"
            onChange={(e) => {
              setItemText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setIsEditing(false);
            }}
          />
        ) : (
          <span className={`${isDone && "line-through opacity-70"}`}>
            {itemText}
          </span>
        )}
      </div>
      <div className="flex gap-[5px]">
        <button
          className="text-[15px] cursor-pointer bg-mutedTextColor/95 text-background/90 p-[8px] rounded-lg"
          onClick={async () => {
            if (isEditing === false) {
              setIsEditing(true);
            } else {
              const newTodoList = todoList.map((todo) => {
                const newItem: todoItem =
                  todo.id === itemId
                    ? {
                        id: itemId,
                        text: itemText,
                        completed: isDone,
                      }
                    : todo;

                return newItem;
              });

              try {
                await addTodos(newTodoList);
                setTodoList(newTodoList);
              } catch (error) {
                console.error("Error editing todo", error);
              }

              setIsEditing(false);
            }
          }}
        >
          {isEditing ? <FaCheck /> : <LuPen />}
        </button>
        <button
          className="text-[15px] cursor-pointer bg-mutedTextColor/95 text-background/90 p-[8px] rounded-lg"
          onClick={handleDelete}
        >
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  );
};
