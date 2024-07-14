export const Task = ({ task, startEdit, dilete, realIndex }) => {
  return (
    <>
      <div key={realIndex} className="bg-white shadow-md rounded p-4 mb-4 justify-center">
        <p className="font-bold text-lg">
          Name : <span className="font-normal">{task.name}</span>
        </p>
        <p className="font-bold text-lg">
          Description : <span className="font-normal">{task.description}</span>{" "}
        </p>
        <p className="font-bold text-lg">
          Deadline : <span className="font-normal">{task.deadline}</span>
        </p>
        <p className="font-bold text-lg">
          Status :{" "}
          <span
            className="font-normal text-black"
          >
            {task.status}
          </span>
        </p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => startEdit(realIndex)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => dilete(realIndex)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
