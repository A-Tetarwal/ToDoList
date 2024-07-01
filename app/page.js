"use client"
import React, { useState } from "react";
import './page.css'

const page = () => {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [mainTask, setMainTask] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }])
    settitle('');
    setdesc('');
    console.log(mainTask.title);
  }


  let renderTask = <h2>No Tasks Available</h2>
  
  renderTask =  mainTask.map((t, i) => {
    return <div className="flex justify-between">
      <h5>{t.title}</h5>
      <h6>{t.desc}</h6>
    </div>
  })
  return (
    <div>
      <form onSubmit={submitHandler} className="text-black m-4 flex flex-col justify-center items-center">
        <input 
          type="text" 
          className="p-2 placeholder:text-gray-500 text-sm border-b w-1  focus:outline-none focus:bg-slate-100" 
          placeholder="Enter task here" 
          required  
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <textarea 
          name="description" 
          className="p-2 placeholder:text-gray-500 placeholder:text-sm border-b w-1 focus:outline-none focus:bg-slate-100" 
          placeholder="Add Description"  
          value={desc}
          onChange={(e) =>{
            setdesc(e.target.value);
          }}
        ></textarea>
        <button 
          className="text-white w-1 bg-red-600 hover:bg-red-700"
        >Add</button>
      </form>

      <br/>

      <div className="p-8 bg-gray-950 ml-3 mr-3">
        <ul>
          {renderTask}
        </ul>
      </div>
    </div>
  );
};

export default page;
