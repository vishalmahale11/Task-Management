import React, { useEffect, useState } from "react";
import styles from "../../styles/processing-task-css/processing-task.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskItem from "./task-item";

const ProcessingTaskview = () => {
  const [tasksData, setTasksData] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [dummyTask, setDummyTask] = useState(
    !tasksData || tasksData.length === 0
  );
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      setTasksData(JSON.parse(localStorage.getItem("tasks")) || {});
    };
    window.addEventListener("tasks", handleStorageChange);
    return () => {
      window.removeEventListener("tasks", handleStorageChange);
    };
  }, [tasksData]);

  const handleDrop = (rowId, columnId) => {
    const updatedColumns = tasksData.map((column) => {
      const updatedRows = column.rows.filter((row) => row.id !== rowId);

      if (column.id === columnId) {
        const movedRow = tasksData
          .map((c) => c.rows)
          .flat()
          .find((row) => row.id === rowId);

        if (movedRow) {
          return {
            ...column,
            rows: [
              ...updatedRows,
              {
                id: rowId,
                taskname: movedRow?.taskname,
                priority: movedRow?.priority,
                description: movedRow?.description,
              },
            ],
          };
        }
      }

      return { ...column, rows: updatedRows };
    });
    setTasksData(updatedColumns);
  };

  const handleOnchange = (e) => {
    let searchText = e.target.value.toLowerCase();
    let filterData = tasksData.map((colum) => {

      const filterRows = colum.rows.filter((rows) => 
       rows.taskname.toLowerCase().includes(searchText) 
      )
      return {...colum, rows: filterRows};
    })
    setFilteredTasks(filterData);
  }

  return (
    <div className={styles.processingmaincontainer}>
      <div>
        <h3>Kanban View</h3>
      </div>
      <div>
        <input type="text" placeholder="search"  onChange={(e) => handleOnchange(e)}/>
      </div>
      <div className={styles.horizontalLine}></div>

      {dummyTask ? (
        <div className={styles.dummymaindiv}>
          <div className={styles.dummyinnerdiv}>
            <h3>Added</h3>
          </div>
          <div className={styles.dummyinnerdiv}>
          <h3>Started</h3>

          </div>
          <div className={styles.dummyinnerdiv}>
          <h3>Completed</h3>

          </div>
        </div>
      ) : (
        <DndProvider backend={HTML5Backend}>
        <div className={`${styles.columnsContainer} columns-container`}>
          {(filteredTasks.length > 0 ? filteredTasks : tasksData).map(
            (tasks) => (
              <TaskItem
                key={tasks.id}
                id={tasks.id}
                title={tasks.title}
                rows={tasks.rows}
                onDrop={handleDrop}
              />
            )
          )}
        </div>
      </DndProvider>
      )}
    </div>
  );
};

export default ProcessingTaskview;
