'use client'
import MuiCard from "@/components/MuiCard";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react";

interface Meetup {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  location: string;
  img_url: string;
}
export default function Home() {
  const [meetups, setMeetups] = useState<Meetup[]>([]); 
  
  useEffect(() => {
    axios.get('/api/meetups')
      .then(res => res.data)
      .then(data => setMeetups(data.data)); 
  }, []);
  
  return (
    <>
      {meetups.length > 0 ? (
        meetups.map(meetup => (
          <MuiCard
            _id={meetup._id.toString()}
            key={meetup._id.toString()} 
            title={meetup.title} 
            location={meetup.location} 
            img={meetup.img_url} 
          />
        ))
      ) : (
        <Typography variant="h6" component="p">
          No meetups available.
        </Typography>
      )}
      </>
  );
}
