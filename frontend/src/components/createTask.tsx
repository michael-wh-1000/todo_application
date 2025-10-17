import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import type { todoItem } from "../lib/types";
import { GoPlus } from "react-icons/go";
import { addTodos } from "../lib/functions";

export const CreateTask = ({
  todoList,
  setTodoList,
}: {
  todoList: todoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<todoItem[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newtaskText, setNewTaskText] = useState("");
  const inputFieldRef = useRef<HTMLInputElement>(null);

  const createNewTask = async (taskText: string) => {
    if (taskText.length > 0) {
      const newTask = {
        id: Math.round(Math.random() * 10000),
        text: taskText,
        completed: false,
      };

      try {
        await addTodos([...todoList, newTask]);
        setTodoList([...todoList, newTask]);
      } catch (error) {
        console.error("Error adding todo", error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createNewTask(newtaskText);
      setNewTaskText("");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      inputFieldRef?.current?.focus();
    }
  }, [isOpen]);

  return (
    <div>
      <button
        className="text-background bg-linear-to-r from-accentColor2/90 to-accentColor/90 border-[1.5px] border-accentColor p-[10px] rounded-lg text-[18px] cursor-pointer hover:scale-105 transition-all"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <GoPlus />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setNewTaskText("");
                setIsOpen(false);
              }
            }}
            className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-xs z-1 flex justify-center items-center"
          >
            <motion.div
              initial={{ y: 10, opacity: 0, rotate: 5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 10, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-full max-w-[450px] bg-white px-[50px] py-[30px] rounded-xl flex flex-col gap-[25px]"
            >
              <h2 className="text-[20px] font-semibold">Create New</h2>
              <input
                type="text"
                ref={inputFieldRef}
                placeholder="Enter task"
                className="w-full outline-0 border-b-[1px] border-black/50"
                value={newtaskText}
                onChange={(e) => {
                  setNewTaskText(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <div className="flex justify-between">
                <button
                  className="px-[10px] py-[5px] border-[1px] border-mutedTextColor rounded-md text-mutedTextColor cursor-pointer"
                  onClick={() => {
                    setNewTaskText("");
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-mutedTextColor px-[10px] py-[5px] border-[1px] border-mutedTextColor rounded-md text-background cursor-pointer"
                  onClick={() => {
                    createNewTask(newtaskText);
                    setNewTaskText("");
                    setIsOpen(false);
                  }}
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
