import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import { useAppContext } from "@/context/AppContext";

function Toast() {
  const [{ toastNotification }] = useAppContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!toastNotification);
  }, [toastNotification]);

  const onClose = () => {
    setVisible(false);
  };

  // const { icon, color, textColor } = getToastData();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={visible}
      onClose={onClose}
      autoHideDuration={6000}
    >
      <Box>
        <Alert severity={toastNotification?.variant || "success"}>
          {toastNotification?.message}
        </Alert>
      </Box>
    </Snackbar>
  );
  // return (
  //   <Snackbar
  //     test-id="snackbar"
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "center",
  //     }}
  //     open={visible}
  //     onClose={onClose}
  //     autoHideDuration={6000}
  //   >
  //     <Container $bgcolor={color} $color={textColor}>
  //       {icon}
  //       <Message>{toastNotification?.message}</Message>

  //       <IconButton
  //         aria-label="close"
  //         color="inherit"
  //         sx={{ p: 0, ml: 1 }}
  //         onClick={onClose}
  //       >
  //         <CloseIcon />
  //       </IconButton>
  //     </Container>
  //   </Snackbar>
  // );
}

export default Toast;
