export const Task = ({ task, startEdit, dilete, realIndex }) => {
  return (
    <>
      <div key={realIndex} className="bg-gray-600 shadow-slate-500 text-white rounded p-4 my-4 mx-8 ">
        <></>
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
            className="font-normal"
          >
            {task.status}
          </span>
        </p>
        <div className="flex justify-center space-x-5 mt-2">
          <button
            onClick={() => startEdit(realIndex)}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
          >
            Edit
          </button>
          <button
            onClick={() => dilete(realIndex)}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
