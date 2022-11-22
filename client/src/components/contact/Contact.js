
import { Box, styled, Typography, Link } from '@mui/material';
import {Instagram, Email } from '@mui/icons-material';
import imageFile from '../../banner2.png';


const Image = styled("img")({
    width:"100%",
    height:"40Vh",
    objectFit: "cover",
    display:"flex",
    alignItems: "center",
    // justify-content: center;
    flexDirection: "column" 
  })

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Image src={imageFile} alt="Banner" />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.instagram.com/gangeshjha1000/" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:gangeshjha11@gmail.com?Subject=This is a subject" target="_blank">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;