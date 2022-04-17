import React from 'react'
import Carousel from 'react-material-ui-carousel'
import FeaturedJumbotronItem from './FeaturedJumbotronItem'
import { Box,Card } from '@mui/material';

function FeaturedJumbotron(props) {
  const {projectList} = props;
  return (
    <Box
        sx={{ 
          backgroundColor: 'background.dark',
          height: {xs: 'auto', md: props.height},
          pb: {xs: 3, md: 0},
          mt: '45px',
        }}
      >
        <Carousel 
            autoPlay={props.autoPlay}
            stopAutoPlayOnHover 
            animation='fade'
            interval={props.autoPlayInterval} 
            timeout={props.transitionTime}
            swipe
            indicators
            navButtonsAlwaysInvisible
            cycleNavigation
            indicatorContainerProps={{
                style: {
                  position: 'absolute',
                  marginTop: '-40px',
                  pointerEvents: 'none',
                }
            }}
            indicatorIconButtonProps={{
                sx: {
                    pointerEvents: 'auto',
                }
            }}
        >
          {projectList.map((item,index) => {
              return (
                <FeaturedJumbotronItem
                    key={index}
                    height={props.height} //400px - (pt+pb)*8px
                    name={item.name}
                    imgURL={item.imageURL}
                    description={item.description}
                    link={item.link}
                    fontSize={props.fontSize}
                />
              )
          })}
        </Carousel>
        </Box>
  )
}

export default FeaturedJumbotron