import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import { useEffect } from "react";
import { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "../context/ToastContext";
export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const [dialogTodo, setDialogTodo] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const { showHideToast } = useToast();

  const completedTodos = useMemo(() => {
    console.log("completedTodos");

    return todos.filter((t) => {
      return t.isComplete;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    console.log("notCompletedTodos");

    return todos.filter((t) => {
      return !t.isComplete;
    });
  }, [todos]);

  function handelDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }
  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  function handelDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != dialogTodo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
    showHideToast("تم حذف المهمة بنجاح");
  }

  function handelUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handelUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == dialogTodo.id) {
        return {
          ...t,
          title: dialogTodo.title,
          details: dialogTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    handelUpdateDialogClose();
    showHideToast("تم تعديل المهمة بنجاح");
  }

  let todoToBeRerender = todos;

  if (displayTodosType == "non-completed") {
    todoToBeRerender = notCompletedTodos;
  } else if (displayTodosType == "completed") {
    todoToBeRerender = completedTodos;
  }
  const todosJsx = todoToBeRerender.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });

  function changeDisplayTypes(e) {
    setDisplayTodosType(e.target.value);
  }

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    let storageTodos = [];
    try {
      storageTodos = saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.log(err);

      storageTodos = [];
    }
    setTodos(storageTodos);
  }, []);

  // useEffect(() => {
  //   const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
  //   setTodos(storageTodos);
  // }, []);

  function handelAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isComplete: false,
    };

    const updatedTodo = [...todos, newTodo];
    setTodos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    setTitleInput("");
    showHideToast("تم اضافة المهمة بنجاح");
  }

  return (
    <>
      {/* DELETE MODAL */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handelDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelDeleteDialogClose}>اغلاق</Button>
          <Button onClick={handelDeleteConfirm} autoFocus>
            نعم, قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* =====DELETE MODAL===== */}

      {/* UPDATE MODAL */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handelUpdateDialogClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            type="email"
            fullWidth
            variant="standard"
            value={dialogTodo?.title || ""}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            type="email"
            fullWidth
            variant="standard"
            value={dialogTodo?.details || ""}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelUpdateDialogClose}>اغلاق</Button>
          <Button onClick={handelUpdateConfirm} autoFocus>
            تأكيد{" "}
          </Button>
        </DialogActions>
      </Dialog>
      {/* =====UPDATE MODAL===== */}

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "90vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              variant="h2"
              className="text-center"
              style={{ fontWeight: "normal" }}
            >
              مهامي
            </Typography>
            <Divider />
            {/* FILTER BUTTONS */}
            <div className="text-center mt-3" style={{ direction: "ltr" }}>
              <ToggleButtonGroup
                value={displayTodosType}
                exclusive
                onChange={changeDisplayTypes}
                aria-label="text alignment"
              >
                <ToggleButton value="non-completed">الغير المنجز</ToggleButton>
                <ToggleButton value="completed">المنجز</ToggleButton>
                <ToggleButton value="all">الكل</ToggleButton>
              </ToggleButtonGroup>
            </div>
            {/* =====FILTER BUTTONS===== */}

            {/* ALL TODOS */}
            {/* <Todo /> */}
            {todosJsx}
            {/* =====INPUT + ADD BUTTON===== */}

            {/* ALL TODOS */}
            <Grid container spacing={2} className="mt-20">
              <Grid size={8}>
                <TextField
                  className="w-full h-full"
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  onClick={() => {
                    handelAddClick();
                  }}
                  disabled={titleInput.length == 0}
                  className="w-full h-full"
                  variant="contained"
                >
                  اضافة مهمة
                </Button>
              </Grid>
            </Grid>
            {/* =====END INPUT + ADD BUTTON===== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
