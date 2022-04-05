import React, {useState} from 'react'
import { Card,CardMedia,CardActions,CardHeader } from '@mui/material'
import { common } from '@mui/material/colors'

function TrendingItem(props) {
    const [isHovering,setIsHovering] = useState(false);

    return (
        <>
            <Card sx={{
                    width:props.width, 
                    height:props.height, 
                    justifyContent: 'center',
                    textAlign: 'center',
                    '&:hover': {
                        filter: `brightness(${props.hoverBrightness})`
                    }
                }}
                onMouseEnter={()=>setIsHovering(true)}
                onMouseLeave={()=>setIsHovering(false)}
            >
                <CardHeader title={props.name} sx={{
                        position:'fixed', 
                        width: props.width, 
                        height: props.height, 
                        mx:'auto',
                        color: common.black,
                        visibility: isHovering ? 'visible' : 'hidden'
                    }}/>
                <CardMedia
                    component="img"
                    image={process.env.PUBLIC_URL + props.imgURL}
                    alt={props.description}
                    sx={{
                        height: props.height,
                        width: props.width,
                        objectFit: 'cover'
                    }}
                />
                <CardActions>
                    
                </CardActions>
            </Card>
        </>
    )
}
TrendingItem.defaultProps = {
    width: 300,
    height: 400,
    
    name:"placeholder",
    imgURL:"https://via.placeholder.com/300x400",
    description: 'placeholder image',
    link: "https://via.placeholder.com/300x400",
    hoverBrightness: 0.6
}
export default TrendingItem