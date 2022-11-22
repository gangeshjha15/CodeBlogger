import React from "react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

import { categories } from "../../constants/data";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
  margin: 5px;
`;

const StyledButton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #fb641b;
  color: #fff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Categories = () => {
  //find out search params

  return (
    <>
      <StyledLink
        to={`/create`}
        style={{ textDecoration: "none" }}
      >
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat) => {
            return (
              <TableRow key={cat.id}>
                <TableCell>
                  <StyledLink to={`/?category=${cat.type}`}>
                    {cat.type}
                  </StyledLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
