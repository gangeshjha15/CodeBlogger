import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { Box, Typography, styled, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { API } from "../../../service/api";

const StyledTooltip = styled(Tooltip)`
  margin-left: auto;
`;
const Component = styled(Box)`
  margin-top: 30px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 10px;
`;
const Container = styled(Box)`
  margin-bottom: 5px;
  display: flex;
`;
const Name = styled(Typography)`
  font-weight: 600;
  margin-right: 20px;
  font-size: 18px;
`;
const StyledDate = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);
  const removeComment = async () => {
    const res = await API.deleteComment(comment._id);
    if (res.isSuccess) {
      setToggle((prevState) => !prevState);
    }
  };
  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.name && (
          <StyledTooltip title="Delete">
            <IconButton>
              <Delete color="error" onClick={removeComment} />
            </IconButton>
          </StyledTooltip>
        )}
      </Container>
      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
