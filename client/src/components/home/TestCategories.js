import React from "react";

import { Tab, Tabs, Box } from "@mui/material";

import { categories } from "../../constants/data";
import { Link } from "react-router-dom";

// const StyledButton = styled(Button)`
//   margin: 20px;
//   width: 85%;
//   background: #fb641b;
//   color: #fff;
// `;

const TestCategories = () => {
  //find out search params
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          textColor="secondary"
          indicatorColor="secondary"
        >
          {categories.map((item) => {
            return (
              <Tab
                component={Link}
                key={item.id}
                value={item.id}
                label={item.type}
                to={`/?category=${item.type}`}
              />
            );
          })}

          {/* <Tab value="one" label="Item One" />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
          <Tab value="four" label="Item Three" /> */}
        </Tabs>
      </Box>
    </>
  );
};

export default TestCategories;
