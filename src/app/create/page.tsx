"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { CreateSchema } from "../../../libs/validation";

const Page = () => {
  const theme = useTheme();
  const router = useRouter();
  const [fileName, setFileName] = useState("Upload Image");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      console.log("File selected:", file.name);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({}); 

    const formData = {
      title,
      location,
      description,
      img: selectedFile,
    };

    try {
      CreateSchema.parse(formData);

      const data = new FormData();
      data.append("title", title);
      data.append("location", location);
      data.append("description", description);
      if (selectedFile) {
        data.append("img", selectedFile);
      }

      const response = await axios.post("/api/meetups/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
      router.push("/"); 
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0] && typeof error.path[0] === "string") {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error:", err);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        id="outlined-basic-title"
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={Boolean(errors.title)}
        helperText={errors.title}
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
        id="outlined-basic-location"
        label="Location"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        error={Boolean(errors.location)}
        helperText={errors.location}
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
        id="outlined-multiline-static-description"
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={Boolean(errors.description)}
        helperText={errors.description}
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
      {errors.img && (
        <Typography color="error" variant="body2">
          {errors.img}
        </Typography>
      )}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          sx={{
            backgroundColor: theme.palette.action.active,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <Typography variant="h6" color="text.disabled" width="120px">
            Create
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Page;
