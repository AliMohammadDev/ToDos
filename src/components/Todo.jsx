import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton } from "@mui/material";
import {
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import { useToast } from "../context/ToastContext";

function Todo({ todo, showDelete, showUpdate }) {
  // const [updatedTodo, setUpdatedTodo] = useState({
  //   title: todo.title,
  //   details: todo.details,
  // });

  const { todos, setTodos } = useContext(TodosContext);
  // const { showHideToast } = useContext(ToastContext);
  const { showHideToast } = useToast();

  // Handel Check
  function handelCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isComplete = !t.isComplete;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم   الاضافة الى المهام المنجزة");
  }

  // Handel Delete
  function handelDeleteClick() {
    showDelete(todo);
  }
  function handelUpdateClick() {
    showUpdate(todo);
  }

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                className=" text-right"
                sx={{
                  textDecoration: todo.isComplete ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" className=" text-right">
                {todo.details}
              </Typography>
            </Grid>
            <Grid size={4} className="flex justify-between">
              {/* ACTIONS BUTTONS */}
              <IconButton
                onClick={() => {
                  handelCheckClick();
                }}
              >
                <CheckIcon
                  fontSize="large"
                  style={{
                    color: todo.isComplete ? "white" : "#8bc34a",
                    backgroundColor: todo.isComplete ? "#8bc34a" : "white",
                    border: "solid #8bc34a 3px",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>

              <IconButton onClick={handelUpdateClick}>
                <ModeEditOutlineOutlined
                  fontSize="large"
                  className="iconButton bg-white rounded-2xl text-blue-600 border-1  border-blue-500"
                />
              </IconButton>

              <IconButton onClick={handelDeleteClick}>
                <DeleteOutlineOutlined
                  fontSize="large"
                  className="iconButton bg-white rounded-2xl text-red-600 border-1 border-red-500"
                />
              </IconButton>
              {/* =====END ACTIONS BUTTONS===== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
