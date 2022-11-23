import React, { useState, useContext } from "react";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
  TextField,
  Autocomplete,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import { top20Categories } from "../../constants/data";

const Image = styled("img")({
  marginTop: "10px",
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Container = styled(Box)(({theme})=>({
  margin: "50px 100px",

  [theme.breakpoints.down('md')]: {
    margin: '5px'
  }

}))

const StyledFormControl = styled(FormControl)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;
const StyledInputBase = styled(InputBase)`
  flex: 1;
  margin: 0 20px;
  font-size: 18px;
  border: 1px solid grey;
  padding: 0 10px;
  border-radius: 5px;
`;

const TextArea = styled(TextareaAutosize)`
  font-size: 16px;
  width: 100%;
  border: 1px solid grey;
  margin-top: 20px;
  &:focus-visible {
    outline: none;
  }
  padding: 5px 5px;
  font-family: Arial;
  border-radius: 5px;
`;

const initialPost = {
  title: "",
  description: "",
  name: "",
  email: "",
  createdDate: new Date(),
  category: "",
  picture: "",
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

  // const binaryData = [];
  // binaryData.push(file)
  // const imageUrl = file? URL.createObjectURL(new Blob(binaryData, {type:  "application/zip"})): '';
  // const imageUrl = file? URL.createObjectURL(file): '';
  // console.log(imageUrl)
  // const url = imageUrl? imageUrl: 'https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-copy-space_23-2148708035.jpg?w=1060&t=st=1667457422~exp=1667458022~hmac=d99773fc3688df34ff41d0ecd396c4f030dae3f5333c69bebeaa3079c38c1d14';

  const url = post.picture
    ? post.picture
    : "https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-copy-space_23-2148708035.jpg?w=1060&t=st=1667457422~exp=1667458022~hmac=d99773fc3688df34ff41d0ecd396c4f030dae3f5333c69bebeaa3079c38c1d14";
  // const [imgSrc, setImgSrc] = useState(null)
  // const url = imgSrc? imgSrc: 'https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-copy-space_23-2148708035.jpg?w=1060&t=st=1667457422~exp=1667458022~hmac=d99773fc3688df34ff41d0ecd396c4f030dae3f5333c69bebeaa3079c38c1d14';

  // const location = useLocation();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setFile(e.target.files[0]);
    // setPost({picture: e.target.files[0]});
  };

  //Save Post to database on clicking the publish button
  const savePost = async () => {
    // post.category = location.search?.split("=")[1] || "General";
    post.name = account.name;

    post.email = account.email;
    if (!post.picture) post.picture = post.picture ? post.picture : url;
    post.category = post.category ? post.category : "General";

    const res = await API.createPost(post);
    if (res.isSuccess) {
      setPost(initialPost);
      navigate("/");
    }
  };

  const getImage = async () => {
    if (file) {
      let data = new FormData();
      data.append("name", file.name);
      data.append("file", file);

      const res = await API.fileUpload(data);
      // if (res.isSuccess) {

      // }
      post.picture = await res.data.imageUrl;
    }
  };

  // useEffect(() => {
  //     if(file){
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onloadend = function(e){
  //             console.log(e);
  //             setImgSrc(reader.result);
  //         }
  //     }
  //     // eslint-disable-next-line
  // }, [file])

  return (
    <Container>
      <Image src={url} alt="BlogImage" />
      <Autocomplete
        inputValue={post.category}
        onInputChange={(event, newValue) => {
          setPost({ ...post, category: newValue });
        }}
        style={{ marginTop: "20px", width: "20vw" }}
        disablePortal
        id="combo-box-demo"
        options={top20Categories}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Choose Categories" />
        )}
      />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddPhotoAlternateIcon fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImage}
        />
        <Button variant="text" onClick={getImage}>
          Upload
        </Button>

        <StyledInputBase
          placeholder="Title"
          name="title"
          onChange={handleInput}
        />
        <Button variant="contained" onClick={savePost}>
          Publish
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        placeholder="Description"
        name="description"
        onChange={handleInput}
      />
    </Container>
  );
};

export default CreatePost;
