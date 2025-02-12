import React from "react";
import { Button, Typography, Container, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Navbar />
      <Container sx={{maxWidth:"lg",margin:"80px"}}>
        <Paper sx={{ padding: 4, boxShadow: 3, borderRadius: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              color: "#3f51b5",
              fontSize: "3rem",
            }}
          >
            Welcome to Talent Track!
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginBottom: 3, color: "#555", fontWeight: "lighter" }}
          >
            Your ultimate platform to find and apply for amazing jobs, or post
            your own job openings!
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: "#3f51b5",
                  }}
                >
                  Browse Jobs
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Explore a variety of job opportunities across different
                  industries and locations.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/joblist"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  View Jobs
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: "#3f51b5",
                  }}
                >
                  Post Jobs
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Are you an employer? Post job openings and find the perfect
                  candidates.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link} to="/postjob"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  Post a Job
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  padding: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: "#3f51b5",
                  }}
                >
                  View my Jobs
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Manage and track all the jobs you've posted, stay in control of your hiring process.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link} to="/myjobs"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  My Jobs
                </Button>
              </Paper>
            </Grid>
          </Grid>
      </Paper>
      </Container>
    </Box>
  );
}

export default Home;
