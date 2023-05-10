import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import TaskForm from "./components/TaskForm";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterTask, setFilterTask] = useState(null);

  // Create Task
  const createTask = (value) => {
    // ... -> spread operator: permet de copier les valeurs d'un objet ou d'un tableau
    setTasks([...tasks, value]);
  };

  // Update Task
  const updateTask = (index) => {
    const value = prompt("please enter your new task");
    if (value) {
      const copy = [...tasks];

      copy[index] = value;
      setTasks(copy);
    }
  };

  // delete Task
  const deleteTask = (index) => {
    const copy = [...tasks];
    // splice permet d'ajouter ou supprimer (et renommer un element) -> check mdn
    copy.splice(index, 1);
    setTasks(copy);
  };

  // search Task
  const searchTask = (searchTerm) => {
    const filter = tasks.filter(function (value) {
      const valueLower = value.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return valueLower.includes(searchTermLower);
    });
    setFilterTask(filter);
  };

  // reset search task
  const resetSearch = function () {
    setFilterTask(null);
  };

  const data = filterTask || tasks;

  return (
    <>
      <header className="bg-secondary py-2">
        <Container fluid className="p-0">
          <h1 className="text-white text-center">Todo app</h1>
        </Container>
      </header>

      <main className="container">
        {/* Task Form */}
        <TaskForm createTask={createTask} searchTask={searchTask} />

        {/* display Tasks */}
        <section className="mt-5">
          {/* filterTask?.lenght -> le "?" permet de verifier si filterTask existe (not null), cela fonctionne avec les objets seulement */}
          {filterTask ? (
            <button onClick={resetSearch} className="btn btn-primary">
              Reset
            </button>
          ) : null}

          {data.map((value, index) => {
            return (
              <div key={index} className="bg-secondary p-2 mb-3">
                <p className="text-white">
                  # {index + 1} - {value}
                </p>
                <div className="d-flex gap-2">
                  <span
                    onClick={() => updateTask(index)}
                    className=" text-bg-warning text-white p-2"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => deleteTask(index)}
                    className=" text-bg-danger text-white p-2"
                  >
                    Delete
                  </span>
                </div>
              </div>
            );
          })}

          {data.length === 0 && (
            <h2 className="text-danger fs-1">Any Task...</h2>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
