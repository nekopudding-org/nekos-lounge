import React from 'react'
import { CardMedia,Box,Stack, Typography, Link } from '@mui/material';
import { common } from "@mui/material/colors";
import theme from 'theme';

function FeaturedJumbotronItem(props) {
  return (
    <>
      <Stack 
        direction={{xs: 'column', md: 'row'}}
        sx={{
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: common.black,
        }}
      >      
        <CardMedia
            component="img"
            image={process.env.PUBLIC_URL + props.imgURL}
            alt={props.description}
            sx={{
              height: {xs: '300px', md:props.height}, 
              objectFit: 'cover',
              opacity: props.brightness,
              filter: 'brightness(0.25)',
        }}/>
        <Stack 
          sx={{
            width: {xs: '100%', lg: '900px'}, 
            height: {xs: 'auto', md:props.height}, 
            bgcolor: theme.palette.background.dark,
            justifyContent: 'center', 
            pl: 10, 
            pt: {xs: 3, md: 0},
            pb: {xs: 8, md: 0},
            textAlign: 'left'
          }}
        >
          <Typography variant='h4' lineHeight={2}>{props.name.toUpperCase()}</Typography>
          <Typography variant='body1' lineHeight={3}>{props.description}</Typography>
          <Box>
            <Link href={props.link} target='_blank' rel="noreferrer">LEARN MORE</Link>
          </Box>
        </Stack>
    </Stack>
  </>
  )
}

export default FeaturedJumbotronItem