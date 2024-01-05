import React from "react";
import { useDrag } from "react-dnd";
import styles from "../../styles/processing-task-css/row.module.css";

const Row = ({ id, taskname, priority, description }) => {
  const [, drag] = useDrag({
    type: "ROW",
    item: { id },
  });

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
    </div>
  );
};

export default Row;
