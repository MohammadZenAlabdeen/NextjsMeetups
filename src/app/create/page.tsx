"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Page = () => {
  const theme = useTheme();
  const [fileName, setFileName] = useState("Upload Image");

  const handleFileUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      console.log("File selected:", file.name);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: 500, md: 600, lg: 900 },
        gap: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        justifyContent: "center",
        paddingY: 3,
      }}
    >
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        InputLabelProps={{
          style: { color: "black" },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.text.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.action.active,
            },
          },
        }}
      />
      <TextField
        id="outlined-basic"
        label="Location"
        variant="outlined"
        InputLabelProps={{
          style: { color: "black" },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.text.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.action.active,
            },
          },
        }}
      />
      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        InputLabelProps={{
          style: { color: "black" },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.text.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.action.active,
            },
          },
        }}
      />
      <Button
        variant="outlined"
        component="label"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderColor: theme.palette.text.primary,
          color: theme.palette.text.primary,
          width: { sm: "auto" },
          "&:hover": {
            borderColor: theme.palette.action.active,
            color: theme.palette.action.active,
            "& .MuiSvgIcon-root": {
              fill: theme.palette.action.active,
            },
          },
        }}
      >
        <UploadFileIcon
          sx={{
            color: theme.palette.text.primary,
            "&:hover": {
              fill: theme.palette.action.active,
            },
          }}
        />
        {fileName}
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            backgroundColor: theme.palette.action.active,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <Typography variant="h6" color="text.tertiary" width="120px">
            Create
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Page;
