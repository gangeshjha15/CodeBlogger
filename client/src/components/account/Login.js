import React, { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import imageFile from '../../logo2.png'

// Adding styled
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 4px 2px 4px 2px rgba(0 0 0/ 0.5);
`;

const Image = styled("img")({
  width: 150,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  & > div, & > button, 
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  background: #fb641b;
  text-transform: none;
`;
const SignupButton = styled(Button)`
  background: #fff;
  box-shadow: 1px 3px 4px 1px rgb(0 0 0/ 20%);
  text-transform: none;
`;
const Text = styled(Typography)`
  color: grey;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0px;
  margin-top: 10px;
  font-weight: 600;
`;

const Login = ({setIsUserAuth}) => {
  // const imageURL = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

    
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState({name:"", email:"", password:""});
  const [login, setLogin] = useState({email:"", password:""});
  const [error, setError] = useState("")

  const navigate = useNavigate();


  const {setAccount} = useContext(DataContext)

const toggleBtn = ()=>{
    (account === 'login')?toggleAccount('signup'):toggleAccount('login');
  }

const inputChange = (e)=>{
    setSignup({...signup, [e.target.name]:e.target.value})
}

const valueChange = (e)=>{
  setLogin({...login, [e.target.name]:e.target.value})
}

const signupUser = async()=>{
    const res = await API.userSignup(signup);
    if(res.isSuccess){
      setError('');
      setSignup({name:"", email:"", password:""});
      toggleAccount('login');
    } else if(!res.isSuccess){
      setError('User with this email already exist!')
    }else{
      setError('Something went wrong! Try agin later')
    }
    
}

// using fetch
// const signupUser = async()=>{
//   try {
//     const data = await fetch('http://localhost:8000/api/signup',{
//       method:'POST',
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body: JSON.stringify(signup)
//     })

//     const res = await data.json();
//     console.log(res);
    
//   } catch (error) {
//     console.log(error);
//   }
// }

const loginUser = async()=>{
  const res = await API.userLogin(login);

  if(res.isSuccess){
    setError('');

    sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
    sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`);


    setAccount({name: res.data.name, email: res.data.email, id: res.data.id});

    //mark user authentication to true
    setIsUserAuth(true);

    navigate('/');
  }else{
    setError('Something went wrong! Try agin later')
  }
}    


  return (
    <Component>
      <Box>
        <Image src={imageFile} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" type='email' onChange={(e) => valueChange(e)} name="email" label="Email" />
            <TextField variant="standard" type='password' onChange={(e) => valueChange(e)} name="password" label="Password" />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={toggleBtn} variant="text">Create an account</SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" type='text' id="name" name="name" onChange={inputChange} label="Name" />
            <TextField variant="standard" type='email' id="email" name="email" onChange={inputChange} label="Email" />
            <TextField variant="standard" type='password' id="password" name="password" onChange={inputChange} label="Password" />

            {error && <Error>{error}</Error>}

            <SignupButton onClick={signupUser} variant="text">Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton onClick={toggleBtn} variant="contained">Already Have an Account?</LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
