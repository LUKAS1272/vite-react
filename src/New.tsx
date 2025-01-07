import { useContext, useState } from "react";
import MyContext from "./context";

const New = () => {
    const [ taskName, setTaskName ] = useState('');
    
    const handleChange = (e) => {
        setTaskName(e.target.value); // Update state with the current input value
    };
    
    const { tasks, setTasks } = useContext(MyContext);

    const addTask = (taskName: string) => {
        setTasks((prevTasks) => [...prevTasks, { id: Date.now(), name: taskName, completed: false }])
    };

    return (
        <div>
            <h2>Add new</h2>
            <label htmlFor="name">Task name</label>
            <input type="text" id="name" name="name" value={taskName} onChange={handleChange} />
            <button onClick={() => addTask(taskName)}>
                Add task {taskName}
            </button>
        </div>
    )
};

export default New;