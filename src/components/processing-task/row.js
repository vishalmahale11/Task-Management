import React from "react";
import { useDrag } from "react-dnd";
import styles from "../../styles/processing-task-css/row.module.css";

const Row = ({ id, taskname, priority, description }) => {
  const [, drag] = useDrag({
    type: "ROW",
    item: { id },
  });

  const handleEdit = (id, taskname, priority, description) => {
    console.log({id, taskname, priority, description}, "EDIT" );
    localStorage.setItem("edit", JSON.stringify({id, taskname, priority, description}));
    window.location.reload();
  }


  return (
    <div ref={drag} className={styles.row}>
      <div>
        <div
          className={
            styles[
              (priority === "high" && "highcolor") ||
                (priority === "medium" && "mediumcolor") ||
                (priority === "low" && "lowcolor")
            ]
          }
        >
          {priority}
        </div>
        <div className={styles.tasknamediv}>{taskname}</div>
      </div>
      <div className={styles.descdiv}>{description}</div>
      <button onClick={() => handleEdit(id, taskname, priority, description)}>Edit</button>
    </div> 
  );
};

export default Row;
