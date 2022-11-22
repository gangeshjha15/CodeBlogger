import React from 'react'
import { styled } from "@mui/material";
import imageFile from '../../banner.png';

// background: url(https://img.freepik.com/premium-photo/woman-works-office-blue-background-concept-workspace-working-computer-freelance-banner_164357-1144.jpg?w=2000) center/100% repeat-x;
const Image = styled("img")({
  width:"100%",
  height:"40Vh",
  objectFit: "cover",
  display:"flex",
  alignItems: "center",
  // justify-content: center;
  flexDirection: "column"

})



// const Heading = styled(Typography)`
//     font-size: 70px;
//     color: #fff;
//     line-height: 1;
//     font-weight:600;
// `;

// const SubHeading =  styled(Typography)`
//     background:#b2e8fa;
//     font-size:20px;
//     color:#fff;
// `;


const Banner = () => {
  return (
    <Image src={imageFile}/>
  )
}

export default Banner