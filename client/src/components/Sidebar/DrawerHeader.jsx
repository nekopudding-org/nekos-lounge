import { styled, useTheme } from "@mui/material/styles";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));


export default DrawerHeader;