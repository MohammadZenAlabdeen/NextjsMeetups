"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
interface Meetup {
  _id:string;
  title: string;
  description: string;
  location: string;
  img_url: string;
}
const Page = () => {
  const { id } = useParams();
  const sentId=id?.toString();
  const theme = useTheme();
  const [meetup, setMeetup] = useState<Meetup>();
  useEffect(() => {
    axios
      .get(`/api/meetups/${sentId}`)
      .then((res) => res.data)
      .then((data) => setMeetup(data.data));
  }, []);

  if (meetup) {
    return (
      <Box sx={{ width: { xs: 250, sm: 450, md: "65%", ls: "65%" } }}>
        <Card>
          <CardMedia>
            <Image
              width={500}
              height={280}
              style={{ objectFit: "cover", width: "100%"}}
              alt={meetup.title}
              src={meetup.img_url}
            ></Image>
          </CardMedia>
          <CardContent>
            <Typography variant="h3">
              {meetup.title}
            </Typography>
            <Typography variant="h5" gutterBottom >
              {meetup.location}
            </Typography>
            <Typography variant="subtitle1" color={theme.palette.text.secondary}>{meetup.description}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }
};
export default Page;
