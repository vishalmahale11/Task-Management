import TaskForm from "../components/create-task/task-form";
import Greeting from "../components/date&time";
import ProcessingTaskview from "../components/processing-task/processing-view-task";
import styles from "../styles/dashboard-file-css/dashboard.module.css"

const DashboardComponent = () => {
  return (
    <>
      <Greeting />
      <div className={styles.dashboard}>
        <TaskForm />
        <ProcessingTaskview />
      </div>
    </>
  );
};

export default DashboardComponent;
