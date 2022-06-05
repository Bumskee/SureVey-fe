import { Tab, Tabs, Paper } from '@mui/material'
import React from 'react'
import "./Tabs.css"



function CenterTabs() {
  return (
    <Paper className="root">
      <Tabs
      className='tabs'
      textColor="primary"
      indicateColor="primary"
      centered
      >
        <Tab label="Questions" className='tab'></Tab>
        <Tab label="Responses" className='tab'></Tab>
      </Tabs>
    </Paper>
  )
}

export default CenterTabs