import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [showFinished, setShowFinished] = useState(false); // Initially unchecked

  useEffect(() => {
    // Load from localStorage on mount
    let todoString = localStorage.getItem("toDos");
    if (todoString) {
      let loadedToDos = JSON.parse(todoString);
      setToDos(loadedToDos);
    }
  }, []);

  const addToDoS = (newToDos) => {
    // Save the updated toDos to localStorage
    localStorage.setItem("toDos", JSON.stringify(newToDos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = toDos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newToDos = toDos.filter((item) => item.id !== id);
    setToDos(newToDos);
    addToDoS(newToDos);
  };

  const handleDelete = (id) => {
    let newToDos = toDos.filter((item) => item.id !== id);
    setToDos(newToDos);
    addToDoS(newToDos);
  };

  const handleAdd = () => {
    const newToDo = { id: uuidv4(), todo, isCompleted: false };
    const updatedToDos = [...toDos, newToDo];
    setToDos(updatedToDos);
    setTodo(""); // Clear the input field
    addToDoS(updatedToDos); // Save the new toDos to localStorage
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = toDos.findIndex((item) => item.id === id);
    let newToDos = [...toDos];
    newToDos[index].isCompleted = !newToDos[index].isCompleted;
    setToDos(newToDos);
    addToDoS(newToDos); // Save the updated state to localStorage
  };

  // Sort toDos: incompletion first, then completed
  const sortedToDos = toDos.sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return 0; // If both are the same, no change in order
    }
    return a.isCompleted ? 1 : -1; // completed items will come last
  });

  return (
    <>
      <Navbar />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-6 bg-purple-200 min-h-[10vh] md:w-[40%]">
        <h1 className="font-bold text-center text-2xl my-1 border-b-2 border-purple-600 p-2">
          TaskNest - Your Nest for All Things Productive.
        </h1>
        <div className="addTodo my-4 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a To-Do</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              autoFocus
              className="w-full rounded-lg px-4 py-1 text-lg focus:outline-purple-400 placeholder-purple-400 text-purple-900"
              placeholder="Enter your activity...."
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 0}
              className="bg-purple-800 mx-2 rounded-lg hover:bg-purple-900 disabled:bg-purple-500 p-4 py-2 text-lg font-semibold text-white"
            >
              Add
            </button>
          </div>
        </div>
        <div className="text-sm items-center">
          <input
            className="my-4 w-3 h-3"
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label
            className="mx-2"
            htmlFor="show"
          >
            Show Finished List
          </label>
        </div>
        <div className="h-[1px] bg-purple-950 opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your To-Do&rsquo;s</h2>
        <div className="toDos">
          {toDos.length === 0 && (
            <div className="m-2 text-lg">No To-Do&rsquo;s to display</div>
          )}
          {sortedToDos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex my-2 justify-between"
                >
                  <div className="flex gap-5 text-lg items-center">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                      className="w-4 h-4"
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-green-800 hover:bg-green-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-800 hover:bg-red-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
