import * as React from "react";
import { Button, Typography, TextField, Box, Stack } from "@mui/material";
import CoverLayout from "../components/CoverLayout";
import { useNavigate } from "react-router-dom";

const backgroundImage =
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1400";

export default function CoverPage() {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState()

  const handleClick = () => {
    console.log("home button clicked");
    navigate(`/home/${address}`);
    window.location.reload();
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <CoverLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
       Voting Blockchain
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Nhập address account
      </Typography>
      {/* <TextField
          id="outlined-basic"
          label="Voters Address"
          variant="outlined"
          value={address}
          onChange={handleAddressChange}
        />
      <Button
        color="secondary"
        variant="contained"
        size="large"
        sx={{ minWidth: 200 }}
        onClick={handleClick}
      >
        Đăng nhập với người dùng này
      </Button> */}
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "2rem",
        width: "40%",
      }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Voters Address"
          variant="outlined"
          value={address}
          onChange={handleAddressChange}
        />
        <Button variant="contained" onClick={handleClick}>
          Đăng nhập voter
        </Button>
      </Stack>
    </Box>
    </CoverLayout>
  );
}
