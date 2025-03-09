"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Drawer,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";
import React, { useState } from "react";
import Link from "next/link";

const MuiNavBar = () => {
    const theme=useTheme();
  const isSmall = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="static" color='secondary'>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="logo"
          onClick={() => {
            if (isSmall) setOpen(true);
          }}
        >
          {!isSmall ? (
            <Link href="/">
              <ApartmentIcon color='primary' sx={{fill:'white'}} />
            </Link>
          ) : (
            <ApartmentIcon color='primary'sx={{fill:'white'}}/>
        )}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="primary">
          MeetUps
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Button color="inherit">
            <Link href="/">
              <Typography variant="h6" color="primary" textAlign={"center"}>
                Home
              </Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/create">
              {" "}
              <Typography variant="h6" color="primary" textAlign={"center"}>
                create
              </Typography>
            </Link>
          </Button>
        </Stack>
        <Drawer
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Box
            sx={{
              width: 255,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            role="presentation"
            py={10}
            px={2}
            alignContent={"center"}
          >
            <Button color="inherit">
              <Link href="/">
                <Typography variant="h6" color="text" textAlign={"center"}>
                  Home
                </Typography>
              </Link>
            </Button>
            <Button color="inherit">
              <Link href="/create">
                <Typography variant="h6" color="text" textAlign={"center"}>
                  create
                </Typography>
              </Link>
            </Button>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default MuiNavBar;
