import React from 'react';
import {Box, Grid, Link, List, Typography, Stack} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import theme from 'theme';


const Footer = () => {
  const links = [
    { icon: MailIcon, href: "mailto: deany.y.ca@gmail.com" },
    { icon: FacebookIcon, href: "https://www.facebook.com/dean.y.ca/" },
    { icon: LinkedInIcon, href: "https://www.linkedin.com/in/dean-yang-438663189/" },
    { icon: GitHubIcon, href: "https://github.com/nekopudding" },
  ]
  return (
    <>
        <Stack sx={{
          py: 3,
          backgroundColor: theme.palette.background.dark,
          flexGrow: 0
        }}>
          <Stack direction='row' sx={{ margin: '0 auto', my: 2}} spacing={8}>
            {links.map((item,index) => {
                return (
                  <React.Fragment key={index}>
                    <Link 
                      underline="none"
                      href={item.href}
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <item.icon fontSize='large' sx={{ '&:hover': {color:theme.palette.primary.light}}}/>
                    </Link>
                  </React.Fragment>
                )
              })}
          </Stack>
          <Stack direction='column-reverse' sx={{
            height: '40px',
            textAlign:'center'
          }}>
            <Typography variant='body1'>
              © Nekopudding 2022
            </Typography>
          </Stack>
        </Stack>
    </>
  )
}

export default Footer