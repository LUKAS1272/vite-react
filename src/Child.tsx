import { useContext } from "react";
import MyContext from "./context";

const Tasks = () => {
    const { tasks, setTasks } = useContext(MyContext);

    const toggleCompletion = (id: number) => {
        setTasks((prevTasks: any[]) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const removeTask = (id: number) => {
        setTasks((prevTasks: any[]) =>
            prevTasks.filter((task) => task.id !== id)
        );
    };

    return (
        <>
            <h2>All tasks</h2>
            {tasks.map((item) => (
                <p key={item.id}>
                    {item.name} - {item.completed ? "completed" : "not completed"}
                    <button onClick={() => toggleCompletion(item.id)}>
                        Toggle Completion
                    </button>
                    <button onClick={() => removeTask(item.id)}>
                        Remove task
                    </button>
                </p>
            ))}
        </>
    );
};

export default Tasks;