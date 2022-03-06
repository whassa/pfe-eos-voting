
import Image from "next/image";
import Menu, { drawerWidth } from "../src/component/Menu/Menu";
import styles from "../styles/Home.module.css";
import { Box, Container, Grid, IconButton, Typography, NativeSelect } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import ListView from "../src/component/Proposals/Home/ListView/listView";
import GridView from "../src/component/Proposals/Home/GridView/gridView";
import resolutions from "../src/component/Proposals/mockDataForTest";
import { useState, useEffect } from "react";
import Header from "component/Head/Header";
import { useRouter } from "next/router";
import { getProposals } from "../src/utils/ContractActions/Contract";



export default function Home({ ual, privateKey, eosAccountName }) {
  const [view, setView] = useState("listView");
  const [sort, setSort] = useState("Date");
  const [resolutions, setResolutions] = useState([]);
  const router = useRouter();

  const cardOnClick = (id) => {
    router.push("/proposal/"+id);
  }

  useEffect( () => {
    getProposals(privateKey, eosAccountName).then( (value) => {
      console.log(value.rows);
      setResolutions(value.rows);
    });
  }, []);
  

  return (
    <>
      <Header></Header>
      <Menu ual={ual} />
      <Container
        sx={{
          width: { xs: `calc(100% - ${drawerWidth}px)` },
          paddingLeft: { xs: "120px" },
          paddingTop: { xs: "40px" },
        }}
      >
        <Box sx={{ float: "right", display: 'flex' }}>
          <Box sx={{display: 'flex', marginRight: '10px'}}>
            <Typography component="span" sx={{ marginTop: 'auto', marginBottom: 'auto', marginRight: '10px'}}>
              Sort by 
            </Typography>
            <NativeSelect defaultValue={'Date'} onChange={(e) => {setSort(e.target.value)}}>
              <option value={'Date'}>Date</option>
              <option value={'Vote'}>Vote</option>
            </NativeSelect>
          </Box>
          
          <IconButton
            color={view === "listView" ? "secondary" : "primary"}
            aria-label="List view button"
            component="span"
            onClick={() => {setView('listView')}}
          >
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton
            color={view === "gridView" ? "secondary" : "primary"}
            aria-label="grid view button"
            component="span"
           
            onClick={() => {setView('gridView')}}
          >
            <GridViewIcon />
          </IconButton>
        </Box>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item md={6} sx={{ width: 1, marginLeft: { xs: "24px" } }}>
            {view === 'listView' && <ListView cardOnClick={cardOnClick} resolutions={resolutions} />}
            {view === 'gridView' && <GridView cardOnClick={cardOnClick} resolutions={resolutions} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  return {
      props: {
          privateKey: process.env.PRIVATE_KEY,
          eosAccountName: process.env.EOS_ACCOUNT_NAME,
      }, // will be passed to the page component as props
  };
}