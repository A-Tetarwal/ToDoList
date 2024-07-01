"use client";
import React, { useState } from "react";
import "./page.css";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEditing) {
      let updatedTasks = [...mainTask];
      updatedTasks[currentTaskIndex] = { title, desc };
      setMainTask(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const doneHandler = (i) => {
    let updatedTasks = [...mainTask];
    updatedTasks[i].done = !updatedTasks[i].done;
    setMainTask(updatedTasks);
  };

  const editHandler = (i) => {
    setTitle(mainTask[i].title);
    setDesc(mainTask[i].desc);
    setIsEditing(true);
    setCurrentTaskIndex(i);
  };

  let renderTask = <h2>No Tasks Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className={t.done ? "task-done" : ""}>
          <div className="flex flex-row justify-around items-center">
            <div className="flex justify-between">
              <h5>{t.title} |</h5>
              <h6> {t.desc}</h6>
            </div>
            <div>
              <button
                className="bg-green-500 p-1.5 rounded-lg m-1 text-sm"
                onClick={() => doneHandler(i)}
              >
                {t.done ? "Undo" : "Done"}
              </button>
              <button
                className="bg-blue-500 p-1.5 rounded-lg m-1 text-sm"
                onClick={() => editHandler(i)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 p-1.5 rounded-lg m-1 text-sm"
                onClick={() => deleteHandler(i)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      );
    });
  }

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="text-black m-4 flex flex-col justify-center items-center"
      >
        <input
          type="text"
          className="text-sm p-2 placeholder:text-gray-500 placeholder:text-sm border-b w-1 focus:outline-none focus:bg-slate-100"
          placeholder="Enter task here"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          name="description"
          className="text-sm p-2 placeholder:text-gray-500 placeholder:text-sm border-b w-1 focus:outline-none focus:bg-slate-100"
          placeholder="Add Description"
          required
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></textarea>
        <button className="text-white w-1 bg-red-600 hover:bg-red-700">
          {isEditing ? "Update" : "Add"}
        </button>
      </form>

      <br />

      <div className="p-8 bg-gray-950 ml-3 mr-3">
        <ul>{renderTask}</ul>
      </div>
    </div>
  );
};

export default Page;
