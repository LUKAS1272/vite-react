import React, { createContext, useState } from "react";

const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { id: 1, name: "test1", completed: false },
        { id: 2, name: "test2", completed: true },
        { id: 3, name: "test3", completed: false },
    ]);

    return (
        <MyContext.Provider value={{ tasks, setTasks }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;