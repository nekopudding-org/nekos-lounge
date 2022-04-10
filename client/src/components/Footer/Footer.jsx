import React from 'react'
import {Box, Grid, Link, List, Typography} from '@mui/material'

const Footer = () => {
  const links = [
    {
      title: 'Matt Thorson',
      href: "http://www.mattmakesgames.com/",
    },
    {
      title: 'Matt Thorson',
      href: "http://www.mattmakesgames.com/",
    },
    {
      title: 'Matt Thorson',
      href: "http://www.mattmakesgames.com/",
    },
    {
      title: 'Matt Thorson',
      href: "http://www.mattmakesgames.com/",
    },
    {
      title: 'Matt Thorson',
      href: "http://www.mattmakesgames.com/",
    },
  ]
  return (
    <>
        <Box sx={{
          padding: '20px 50px',
          backgroundColor: 'rgb(29, 29, 29)',
        }}>
        <Grid container>
          {links.map((item,index) => {
              return (
                <>
                {index %2 === 0 && <Grid item lg={3} xs={0}/>}
                <Grid item lg={3} xs={12} sx={{textAlign:'center'}}>
                  <Link 
                    key={index}
                    underline="none"
                    href={item.href}
                    target="_blank" 
                    rel="noreferrer"
                  >
                    <Typography variant='h6' sx={{lineHeight: 2}}>{item.title}</Typography>
                  </Link>
                </Grid>
                {index %2 === 1 && <Grid item lg={3} xs={0}/>}
                </>
              )
            })}
            {links.length % 2 === 1 && <Grid item lg={3} xs={0}/>}
            <Grid item xs={12}>
              <Box sx={{
                height: '40px',
                display: 'flex',
                flexDirection: 'column-reverse',
                textAlign:'center'
              }}>
                <Typography variant='body1'>
                  © Nekopudding 2022
                </Typography>
              </Box>
            </Grid>
        </Grid>
        </Box>
    </>
  )
}

export default Footer