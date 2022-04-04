import React, {useState, useEffect} from 'react'
import {Box} from '@mui/material'
import Carousel from 'react-material-ui-carousel'

function Hot() {
    const hotList = ['donut', 'spacegame']
    const [currHot, setCurrHot] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrHot(prev => {
                return (prev < hotList.length - 1 ) ? prev + 1 : 0; 
            })
        }, 15000);
        return () => clearInterval(interval);
    }, [currHot, hotList.length]);

    return (
        <>
            <Box sx={[
                { mr: 2, backgroundColor: 'black' },
                (theme) => ({
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
                }),
            ]}>
                {currHot}
            </Box>
            <Carousel>
                <Box sx={{height:200, width: 200, backgroundColor: 'primary.dark'}} />
                <Box sx={{height:200, width: 200, backgroundColor: 'primary.dark'}} />
                <Box sx={{height:200, width: 200, backgroundColor: 'primary.dark'}} />
            </Carousel>
        </>
    )
}

export default Hot