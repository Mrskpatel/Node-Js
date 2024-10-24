import "./App.css";
import Login from "./Components/Registration/Login";
import Register from "./Components/Registration/Register";
import Todo from "./Components/Todo";
import ViewTodo from "./Components/Viewtodo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/insertadmin" element={<Todo />}></Route>
        <Route path="/viewadmin" element={<ViewTodo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
