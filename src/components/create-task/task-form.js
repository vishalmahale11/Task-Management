import React, { useState } from "react";
import styles from "../../styles/create-task-css/task-form.module.css";

const TaskForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    taskname: "",
    category: "added",
    description: "",
    priority: "high",
  });

  const handleTaskDetailsChange = (field, value) => {
    setTaskDetails((prevTaskDetails) => ({
      ...prevTaskDetails,
      [field]: value,
    }));
  };

  const handleTaskSubmit = () => {
    if (!taskDetails.taskname.trim()) {
      alert('Please Write a task name')
      return;
    }
  
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTasks = [...storedTasks, taskDetails];
    console.log(newTasks, "newTasks");
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  
    setTaskDetails({
      taskname: "",
      category: "added",
      description: "",
      priority: "high",
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
          <form>
            <input
              className={styles.inputBox}
              type="text"
              placeholder="Write your task name"
              value={taskDetails.taskname}
              onChange={(e) =>
                handleTaskDetailsChange("taskname", e.target.value)
              }
            />

            <div className={styles.selectioncontainer}>
              <div className={styles.categorycontainer}>
                <label>Category:</label>
                <select
                  className={styles.selectionoption}
                  value={taskDetails.category}
                  onChange={(e) =>
                    handleTaskDetailsChange("category", e.target.value)
                  }
                >
                  <option value="added">Added</option>
                  <option value="started">Started</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className={styles.categorycontainer}>
                <label>Priority:</label>
                <select
                  className={styles.selectionoption}
                  value={taskDetails.priority}
                  onChange={(e) =>
                    handleTaskDetailsChange("priority", e.target.value)
                  }
                >
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
                placeholder="Write your task description"
                value={taskDetails.description}
                onChange={(e) =>
                  handleTaskDetailsChange("description", e.target.value)
                }
              />
            </div>
          </form>
          <button className={styles.btn} onClick={handleTaskSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
