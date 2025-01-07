import Tasks from "./Child";
import New from "./New";
import { MyProvider } from "./context";
import "./App.css";

function App() {
    return (
        <MyProvider>
            <h1>ToDo</h1>
            <New />
            <Tasks />
        </MyProvider>
    );
}

export default App;
