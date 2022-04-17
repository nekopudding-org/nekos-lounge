import React, {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import TrendingItem from './TrendingItem';
import {projectList as trendingList} from 'assets/data/projectList'

function TrendingCarousel(props) {
    return (
        <>
            <Box sx={
                    { 
                        mr: 2, 
                        backgroundColor: 'background.paper',
                        width: props.width,
                        height: props.height,
                        display: {xs: 'none', md: 'block'}
                    }
                }
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
                            pointerEvents: 'none',
                            marginTop: '-30px',
                        }
                    }}
                    indicatorIconButtonProps={{
                        sx: {
                            pointerEvents: 'auto',
                        }
                    }}
                >
                    {trendingList.map((item,index) => {
                        return (
                            <TrendingItem 
                                key={index}
                                width={props.width}
                                height={props.height}
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
            
        </>
    )
}
TrendingCarousel.defaultProps = {
    width: 300,
    height: 400,
    transitionTime: 300,
    fontSize: 50,
    autoPlayInterval: 7000,
    autoPlay: true
}
export default TrendingCarousel;