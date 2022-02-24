
import Image from "next/image";
import Menu, { drawerWidth } from "../../src/component/Menu/Menu";
import { Box, Container, Typography, Tabs, Tab, Button } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import { useState } from "react";
import Header from "component/Head/Header";
import { styled } from "@mui/system";

const views = [
    'Overview',
    'Pros & Cons',
    'Statistics',
    'News',
    'Discussion',
];

export default function pid({ ual }) {
  const [view, setView] = useState(views[0]);

  return (
    <>
      <Header />
      <Menu ual={ual} />
      <Container
        sx={{
          width: { xs: `calc(100% - ${drawerWidth}px)` },
          paddingLeft: { xs: "144px" },
          paddingTop: { xs: "40px" },
        }}
      >
        <Box sx={{display: 'flex'}}>
          <Box sx={{ marginLeft: '10px'}}>
            <Image
               src="/Login/eos-logo.svg"
               alt="Eos logo"
               width={100}
               height={100}
            />
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px' }}>
            <Typography variant="h5">Resolution name</Typography>
            <Typography variant="h6">Proposed by Author name</Typography>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 'auto' }}>
            <Button variant="contained" color="secondary" sx={{textTransform: 'none'} }>Vote for this Resolution</Button>
          </Box>
        </Box>

        <Box>
          <Tabs centered   textColor="secondary"  indicatorColor="secondary" value={view} onChange={(e, newValue) => {setView(newValue)}} aria-label="Resolution tabs">
            { views.map((view) => <Tab key={view} label={view} value={view} />)}
          </Tabs>
        </Box>
        { view === views[0] && (
          <Box>
            Overview
          </Box>
        )}

        { view === views[1] && (
          <Box>
            <NewProsCons ual={ual}></NewProsCons>
          </Box>
        )}


      </Container>
    </>
  );
}
