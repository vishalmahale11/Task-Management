import React, { useRef, useState } from "react";
import styles from "../../styles/create-task-css/task-form.module.css";

const TaskForm = () => {
  const [showForm, setShowForm] = useState(false);
  const categoryRef = useRef(null);
  const [query, setQuery] = useState({
    description: "",
    priority: "",
    id: null,
    taskname: "",
  });

  const [columns, setColumns] = useState([]);

  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000);
    const uniqueId = `${timestamp}-${randomNum}`;
    return uniqueId;
  }

  const handleTaskDetailsChange = (name, value) => {
    setQuery((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const newTask = { ...query, id: generateUniqueId() };
    const categoryValue = categoryRef.current.value;

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const categoryIndex = storedTasks.findIndex(
      (column) => column.title === categoryValue
    );

    if (categoryIndex !== -1) {
      storedTasks[categoryIndex].rows.push(newTask);
    } else {
      storedTasks.push({
        id: generateUniqueId(),
        title: categoryValue,
        rows: [newTask],
      });
    }

    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    window.location.reload();

    setQuery({
      description: "",
      priority: "",
      id: null,
      taskname: "",
    });
    setShowForm(false);
  };

  return (
    <div className={styles.formcontainer}>
      <div className={styles.stickyheader}>
        <h3>Create task</h3>
      </div>
      <div className={styles.horizontalLine}></div>
      <div
        className={styles.createtaskbtn}
        onClick={() => setShowForm(true)}
        style={{ display: showForm ? "none" : "block" }}
      >
        + Create task
      </div>
      {showForm && (
        <div className={styles.taskInputContainer}>
          <form onSubmit={handleTaskSubmit}>
            <input
              className={styles.inputBox}
              name={"taskname"}
              type="text"
              placeholder="Write your task name"
              value={query.taskname}
              onChange={(e) =>
                handleTaskDetailsChange(e.target.name, e.target.value)
              }
              required
            />

            <div className={styles.selectioncontainer}>
              <div className={styles.categorycontainer}>
                <label>Category:</label>
                <select
                  ref={categoryRef}
                  className={styles.selectionoption}
                  defaultValue="Added"
                  required
                >
                  <option value="Added" defaultChecked>
                    Added
                  </option>
                  <option value="Started">Started</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className={styles.categorycontainer}>
                <label>Priority:</label>
                <select
                  name={"priority"}
                  className={styles.selectionoption}
                  value={query.priority}
                  onChange={(e) =>
                    handleTaskDetailsChange(e.target.name, e.target.value)
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className={styles.descriptionlabel}>Description:</div>
            <div>
              <textarea
                className={styles.textarea}
                name={"description"}
                placeholder="Write your task description"
                value={query.description}
                onChange={(e) =>
                  handleTaskDetailsChange(e.target.name, e.target.value)
                }
              />
            </div>
            <button className={styles.btn} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
