import { Grid, Box, Fab, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Link } from "react-router-dom";

// Components
import Banner from "../banner/Banner";
import Posts from "./post/Posts";
import TestCategories from "./TestCategories";

const StyledFab = styled(Fab)`
  background: #fb641b;
  color: #fff;
`;


const TestHome = () => {
  return (
    <Box style={{ position: "relative" }}>
      <Banner />
      <Box sx={{ width: "100%" }}>
        <TestCategories />
      </Box>
      <Grid container item lg={12} sm={12} xs={12}>
        <Posts />
      </Grid>
      <Link to={`/create`} style={{ textDecoration: "none" }}>
        <StyledFab
          color="primary"
          style={{ position: "fixed", bottom: "20px", right: "30px" }}
          variant="extended"
        >
          <AddIcon sx={{ mr: 1 }} />
          Create Blog
        </StyledFab>
      </Link>
    </Box>
  );
};

export default TestHome;
