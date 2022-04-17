import React from 'react'
import {projectList} from 'assets/data/projectList'
import { Stack,Box } from '@mui/material'
import FeaturedJumbotron from './FeaturedJumbotron'


function Featured(props) {
  return (
    <>
      <Stack>
        <FeaturedJumbotron projectList={projectList} height='560px'/>
        <Box sx={{height: '200px', flexGrow: 1}}/>
      </Stack>  
    </>
  )
}

export default Featured