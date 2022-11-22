import React from "react";
import { Box, Avatar, styled, Typography, Rating } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 400px;
  height: 300px;
  box-shadow: 2px 1px 2px 1px rgba(0 0 0/ 0.5);
`;

const Heading = styled(Typography)`
  margin-top: 30px;
  font-size: 30px;
  font-weight: 600;
`;
const SubHeading = styled(Typography)`
  margin-top: 20px;
  font-size: 20px;
  margin-bottom: 20px;
`;
const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Profile = () => {
  const { account } = useContext(DataContext);
  const [value, setValue] = React.useState(2);
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    const child =
      name.split(" ").length > 1
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : `${name.charAt(0)}`;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: child,
    };
  }

  return (
    <Component>
      <Avatar {...stringAvatar(account.name)} style={{ margin: "20px auto" }} />
      <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }} />
      <StyledBox>
        <Heading>Name: {account.name}</Heading>
        <SubHeading>Email: {account.email}</SubHeading>
        <Typography component="legend">Ratings</Typography>
        <Rating name="read-only" value={value} readOnly />
        
      </StyledBox>
    </Component>
  );
};

export default Profile;
