import styles from "../../styles/processing-task-css/processing-task.module.css";

const ProcessingTaskview = () => {
  return (
    <div className={styles.processingmaincontainer}>
      <div>
        <h3>Kanban View</h3>
      </div>
      <div className={styles.horizontalLine}></div>
    </div>
  );
};

export default ProcessingTaskview;
