import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const TaskEdit = () => {
  const [task, setTask] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.getTask(id);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const formattedIdeaDate = task
    ? new Date(task.ideaDate + " UTC").toISOString().slice(0, 10)
    : ""; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.updateTask(task?.id, task);
      navigate("/tasks");
      console.log("Task updated:", response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center w-full shadow-sm p-4">
        Edit Idea <span className="text-secondary block">#{id}</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-quarternary text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="title"
            name="title"
            value={task?.title || ""}
            onChange={handleInputChange}
            required
            minLength={6}
            maxLength={24}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-quarternary text-sm font-bold mb-2"
            htmlFor="description"
          >
           Short Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={task?.description || ""}
            onChange={handleInputChange}
            minLength={10}
            maxLength={250}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-quarternary text-sm font-bold mb-2"
            htmlFor="ideaDate"
          >
            Found Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            id="ideaDate"
            name="ideaDate"
            value={formattedIdeaDate}
            readOnly
            disabled
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className="  text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow hover:shadow-lg"
            type="button"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>
          <button
            className="bg-tertiary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-lg"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
