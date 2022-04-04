import React, {useState, useEffect} from 'react'
import {Box} from '@mui/material'

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
        </>
    )
}

export default Hot