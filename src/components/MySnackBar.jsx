import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Alert } from "@mui/material";

export default function MySnackBar({ open, message }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
