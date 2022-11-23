import React, { useState, useEffect } from 'react'
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api'

const Image = styled('img')({
    marginTop: '10px',
    width:'100%',
    height:'50vh',
    objectFit:'cover',
})
const Container = styled(Box)(({theme})=>({
    margin: "50px 100px",
  
    [theme.breakpoints.down('md')]: {
      margin: '5px'
    }  
  }))

const StyledFormControl = styled(FormControl)`
    margin-top: 20px;
    display:flex;
    flex-direction:row;
`;
const StyledInputBase = styled(InputBase)`
    flex:1;
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
    margin-top:20px;
    &:focus-visible {
        outline:none;
    }
    padding: 5px 5px;
    font-family:Arial;
    border-radius: 5px;
`;

const initialPost = {
    title: '',
    description:'',
    name:'',
    email:'',
    createdDate: new Date(),
    category: '',
    picture: '',
}

const UpdatePost = () => {
    
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const {id} = useParams();



    const url = post.picture? post.picture: 'https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-copy-space_23-2148708035.jpg?w=1060&t=st=1667457422~exp=1667458022~hmac=d99773fc3688df34ff41d0ecd396c4f030dae3f5333c69bebeaa3079c38c1d14';
    // const [imgSrc, setImgSrc] = useState(null)
    // const url = imgSrc? imgSrc: 'https://img.freepik.com/free-photo/top-view-person-writing-laptop-with-copy-space_23-2148708035.jpg?w=1060&t=st=1667457422~exp=1667458022~hmac=d99773fc3688df34ff41d0ecd396c4f030dae3f5333c69bebeaa3079c38c1d14';
    
    const navigate = useNavigate();

    const handleInput = (e)=>{
        setPost({...post, [e.target.name]:e.target.value});
    }
    const handleImage = (e)=>{
        setFile(e.target.files[0]);
        // setPost({picture: e.target.files[0]});
    }

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await API.getPostById(id);
            if(res.isSuccess){
                setPost(res.data);
            }
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    
    //Save Post to database on clicking the publish button
    const updateBlogPost = async ()=>{
        if(!post.picture)
            post.picture = post.picture? post.picture: url;
            
        const res = await API.updatePost(post);
        if(res.isSuccess){
            navigate(`/details/${id}`);
        }
    }

    const getImage = async ()=>{
        if(file){
            let data = new FormData();
            data.append('name', file.name);
            data.append('file', file);

            const res = await API.fileUpload(data);
            post.picture = await res.data.imageUrl;
        }

    }


  return (
    <Container>
        <Image src={url} alt="BlogImage" />

        <StyledFormControl>
            <label htmlFor='fileInput'>
                <AddPhotoAlternateIcon fontSize='large' color='action'/>
            </label>
            <input type='file' id='fileInput' style={{display: 'none'}} accept='image/*' onChange={handleImage}/>
            <Button variant='text' onClick={getImage}>Upload</Button>

        <StyledInputBase placeholder='Title' name='title' value={post.title} onChange={handleInput}/>
        <Button variant='contained' onClick={updateBlogPost}>Update</Button>
        </StyledFormControl>
        <TextArea minRows={5} placeholder='Description' name='description' value={post.description} onChange={handleInput}/>
    </Container>
  )
}

export default UpdatePost;