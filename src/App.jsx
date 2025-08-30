import TodoList from "./components/TodoList";
import "./index.css";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { TodosContext } from "./context/TodosContext";
import { ToastProvider } from "./context/ToastContext";

const theme = createTheme({
  typography: { fontFamily: ["Alexandria"] },
});
const initialTodos = [
  {
    id: uuidv4(),
    title: "اضافة مهمة جديدة",
    details: "تفاصيل المهمة الجيديدة",
    isComplete: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div className="flex justify-center items-center h-screen bg-gray-400">
          <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
