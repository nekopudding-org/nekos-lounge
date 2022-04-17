import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardHeader,
} from "@mui/material";
import { common } from "@mui/material/colors";
import theme from "theme";

function TrendingItem(props) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <Card
        sx={{
          width: props.width,
          height: props.height,
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: common.black,
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <CardHeader
          title={props.name}
          sx={{
            position: "absolute",
            width: props.width,
            height: props.height,
            mx: "auto",
            color: common.black,
            background: "none",
            justifyContent: "center",
            pointerEvents: "none",
          }}
          titleTypographyProps={{
            variant: "card",
            visibility: isHovering ? "visible" : "hidden",
            pointerEvents: "none",
            typography: theme.typography.title,
            fontSize: props.fontSize,
          }}
        />
        <CardMedia
          component="img"
          image={process.env.PUBLIC_URL + props.imgURL}
          alt={props.description}
          sx={{
            height: props.height,
            width: props.width,
            objectFit: "cover",
            opacity: props.brightness,
            "&:hover": {
              opacity: props.hoverBrightness,
              zIndex: -9999,
            },
          }}
        />
      </Card>
    </>
  );
}
TrendingItem.defaultProps = {
  width: 300,
  height: 400,

  name: "placeholder",
  imgURL: "https://via.placeholder.com/300x400",
  description: "placeholder image",
  link: "https://via.placeholder.com/300x400",
  hoverBrightness: 0.5,
  brightness: 0.7,
};
export default TrendingItem;
