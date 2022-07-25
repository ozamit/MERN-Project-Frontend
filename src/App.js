import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ThankYou from "./Pages/ThankYou/ThankYou";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

function App() {
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const notificationMsg = (notification, severity) => {
    setNotification(notification);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="large"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home notificationMsg={notificationMsg} />}
          />
          <Route
            path="/register"
            element={<Register notificationMsg={notificationMsg} />}
          />
          <Route
            path="/login"
            element={<Login notificationMsg={notificationMsg} />}
          />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {notification}
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
