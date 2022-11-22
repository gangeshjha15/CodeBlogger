import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { API } from "../../../service/api";
import Post from "./Post";
import { useSearchParams, Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.getAllPosts({category: category || ''});
      if (res.isSuccess) {
        setPosts(res.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) =>
        <Grid key={post._id} item lg={3} sm={4} xs={12}>
          <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
            <Post post={post} />
          </Link>
        </Grid>
        )
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 38 }}>
          Nothing to display!
        </Box>
      )}
    </>
  );
};

export default Posts;
