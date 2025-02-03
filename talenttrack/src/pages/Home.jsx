import React from "react";
import { Button, Typography, Container, Box, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
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
                  Apply for Jobs
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Found a job that fits your skills? Apply directly through the
                  platform.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  Apply Now
                </Button>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 5 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/joblist"
              sx={{
                padding: "12px 30px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: 3,
              }}
            >
              Explore Job Listings
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
