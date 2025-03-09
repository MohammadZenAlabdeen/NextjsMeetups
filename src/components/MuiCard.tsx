"use client";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import mongoose from "mongoose";
interface props {
  _id:string,
  title: string;
  location: string;
  img: string;
}
const MuiCard = ({ _id,title, location, img }: props) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box sx={{ width: { xs: 250, sm: 350, md: 500 } }}>
      <Card>
        <CardMedia>
          <Image
            alt={title}
            width="500"
            height="140"
            src={img}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h4" color="text">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              backgroundColor: theme.palette.action.active,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={() => {router.push(`/${_id}`)}}
          >
            <Typography variant="h6" color="text.disabled">
              See Details
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default MuiCard;
