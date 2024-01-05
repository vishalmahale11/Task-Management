import React from "react";
import { useDrop } from "react-dnd";
import Row from "./row";
import styles from "../../styles/processing-task-css/processing-task.module.css";


const TaskItem = ({ id, title, rows, onDrop }) => {
  const [, drop] = useDrop({
    accept: "ROW",
    drop: (item) => {
      return onDrop(item.id, id);
    },
  });

  return (
    <div
      ref={drop}
      className={styles.column}
    >
      <h3 className={styles.titlename}>{title}</h3>
      {rows.map((row) => (
        <Row
          key={row.id}
          id={row.id}
          taskname={row?.taskname}
          priority={row?.priority}
          description={row?.description}
        />
      ))}
    </div>
  );
};

export default TaskItem;
