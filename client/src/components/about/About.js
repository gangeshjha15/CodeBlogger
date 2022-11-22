
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import imageFile from '../../banner3.png';

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

const About = () => {

    return (
        <Box>
            <Image src={imageFile} alt="Banner" />
            <Wrapper>
                <Typography variant="h3">Welcome to CodeBlogger</Typography>
                <Text variant="h5">I'm a Software Engineer based in India. 
                    I've built websites, desktop applications and corporate software.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/gangeshjha15" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/gangeshjha100/" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:gangeshjha11@gmail.com?Subject=This is a subject" target="_blank">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;