import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  updateTask,
  setName,
  setDeadline,
  setDescription,
  setStatus,
} from "./state/countSlice";
import { useState } from "react";
import { Task } from "./Task";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const name = useSelector((state) => state.task.name);
  const description = useSelector((state) => state.task.description);
  const deadline = useSelector((state) => state.task.deadline);
  const status = useSelector((state) => state.task.status);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const resetForm = () => {
    dispatch(setName(""));
    dispatch(setDescription(""));
    dispatch(setDeadline(""));
    dispatch(setStatus(""));
    setIsEditing(false);
    setEditIndex(null);
  };

  const add = () => {
    const newTask = { name, description, deadline, status };
    dispatch(addTask(newTask));
    resetForm();
  };

  const startEdit = (index) => {
    const task = tasks[index];
    dispatch(setName(task.name));
    dispatch(setDescription(task.description));
    dispatch(setDeadline(task.deadline));
    dispatch(setStatus(task.status));
    setEditIndex(index);
    setIsEditing(true);
  };

  const update = () => {
    const newTask = { name, description, deadline, status };
    dispatch(updateTask({ index: editIndex, newTask }));
    resetForm();
  };

  const dilete = (index) => {
    if (window.confirm("Do you want to delete this task")) {
      if (index === editIndex) {
        resetForm();
      } else if (index < editIndex) {
        setEditIndex(editIndex - 1);
      }
      dispatch(deleteTask(index));
    }
  };

  const alteredString = (task) => task.trim().replace(" ", "").toLowerCase();

  const tasksAfterSearch = tasks.filter((task) =>
    alteredString(task.name).includes(alteredString(search))
  );

  const tasksAfterFilter = tasksAfterSearch.filter((task) =>
    filterStatus ? task.status === filterStatus : true
  );

  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 2;
  const lastIndex = currentPage * tasksPerPage;
  const firstIndex = lastIndex - tasksPerPage;
  const currentTasks = tasksAfterFilter.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(tasksAfterFilter.length / tasksPerPage);
  const paginate = (PageNumber) => setCurrentPage(PageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mt-5 mb-5">Task Management App</h1>
      <div className="mb-4 p-4 border border-gray-300 rounded-lg">
        {isEditing ? (
          <h2 className="text-xl mb-2 text-center">Edit Task</h2>
        ) : (
          <h2 className="text-xl mb-2 text-center">Add Task</h2>
        )}
        <input
          type="text"
          placeholder="Please enter the name of the task"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Please enter the description of the task"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="date"
          placeholder="Please enter the deadline of the task"
          value={deadline}
          onChange={(e) => dispatch(setDeadline(e.target.value))}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <select
          value={status}
          onChange={(e) => dispatch(setStatus(e.target.value))}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Select the status</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Backlog">Backlog</option>
        </select>
        <div>
          <button
            onClick={isEditing ? update : add}
            className={`p-2 rounded w-full ${
              !name || !description || !status || !deadline 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-500 text-white"
            }`}
            disabled = {name && description && status && deadline ? false : true}
          >
            {isEditing ? `Update the task` : `Add task to the list`}
          </button>
        </div>
      </div>
      {tasks.length > 0 && (
        <>
          <div className="mb-4 p-4 border border-gray-300 rounded-lg">
            <input
              placeholder="Enter search value"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={() => setSearch("")}
              className="bg-blue-500 text-white p-2 rounded w-full mb-2"
            >
              Reset Search
            </button>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Filter status</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              <option value="Backlog">Backlog</option>
            </select>
            <button
              onClick={() => setFilterStatus("")}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Reset Filter
            </button>
          </div>
        </>
      )}
      {tasks.length > 0 && currentTasks.length === 0 && (
        <div className="text-center text-red-500">No results</div>
      )}
      {currentTasks.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4">
            {currentTasks.map((task) => {
              const realIndex = tasks.indexOf(task);
              return (
                <Task
                  task={task}
                  startEdit={startEdit}
                  dilete={dilete}
                  realIndex={realIndex}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`p-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
