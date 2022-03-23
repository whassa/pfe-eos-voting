import Image from "next/image";
import Menu, { drawerWidth } from "../../src/component/Menu/Menu";
import { Box, Container, Typography, Stack, Grid, IconButton, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useReducer, useEffect } from "react";
import Header from "component/Head/Header";

import { getProposalsByUser } from "/src/utils/ContractActions/Contract";
import ListView from "/src/component/Proposals/Home/ListView/listView";
import GridView from "/src/component/Proposals/Home/GridView/gridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";

const initialState = {
  position: "none",
  resolutions: null,
  loading: false,
  view: "listView",
};

const types = {
  USER_FOUND: "USER_FOUND",
  VIEW_CHANGED: "VIEW_CHANGED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.USER_FOUND:
      return { ...state, resolutions: action.resolutions, loading: false,  };
    case types.VIEW_CHANGED:
        return {...state, view: action.value}
    default:
      return { ...state };
  }
};

export default function pid({ ual, userName, eosAccountName }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getProposalsByUser(userName, eosAccountName).then((value) => {
      dispatch({ type: types.USER_FOUND, resolutions: value.rows });
    });
  }, []);

  const cardOnClick = (id) => {
    router.push("/proposal/" + id);
  };

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
        {state.loading ? (
          <Box> loading some stuff </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Stack direction="row">
              <Box>
                <AccountCircleIcon
                  sx={{
                    width: 150,
                    height: 125,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ textAlign: "center" }}
                >
                  {userName}
                </Typography>
              </Box>
            </Stack>
            <Divider/>
            {state.resolutions && state.resolutions.length >= 1 ? (
                <>
                    <Box sx={{  display: "flex", marginTop: '10px', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                        The last six proposals created by the user :
                    </Typography>
                    <IconButton
                        color={state.view === "listView" ? "secondary" : "primary"}
                        aria-label="List view button"
                        component="span"
                        onClick={() => {
                        dispatch({ type: types.VIEW_CHANGED, value: "listView" });
                        }}
                        sx={{ marginLeft: 'auto'}}
                    >
                        <FormatListBulletedIcon />
                    </IconButton>
                    <IconButton
                        color={state.view === "gridView" ? "secondary" : "primary"}
                        aria-label="grid view button"
                        component="span"
                        onClick={() => {
                        dispatch({ type: types.VIEW_CHANGED, value: "gridView" });
                        }}
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
                >
                <Grid item md={6} sx={{ width: 1, }}>
                    {state.view === "listView" && (
                    <ListView
                        cardOnClick={cardOnClick}
                        resolutions={state.resolutions}
                    />
                    )}
                    {state.view === "gridView" && (
                    <GridView
                        cardOnClick={cardOnClick}
                        resolutions={state.resolutions}
                    />
                    )}
                </Grid>
                </Grid>
                </>
            ) :  (
                <Typography variant="h6" sx={{marginTop:'10px'}}>
                    The user has no proposal created.
                </Typography>
            )}
          </Box>
        )}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;

  return {
    props: {
      userName: name,
      eosAccountName: process.env.EOS_ACCOUNT_NAME,
    },
  };
}
