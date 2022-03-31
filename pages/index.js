import Image from "next/image";
import Menu, { drawerWidth } from "../src/component/Menu/Menu";
import styles from "../styles/Home.module.css";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  NativeSelect,
  Stack,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import GridViewIcon from "@mui/icons-material/GridView";
import ListView from "../src/component/Proposals/Home/ListView/listView";
import GridView from "../src/component/Proposals/Home/GridView/gridView";
import { useState, useReducer, useEffect } from "react";
import Header from "component/Head/Header";
import { useRouter } from "next/router";
import { getProposals } from "../src/utils/ContractActions/Contract";
import Loading from "/src/common/Loading";

const initialState = {
  view: "listView",
  sort: "date",
  sortInfo: {
    page: 0,
    more: false,
    next_key: 0,
  },
  resolutions: [],
  loading: true,
};
const types = {
    VIEW_CHANGED: "VIEW_CHANGED",
    SORT_CHANGED: "SORT_CHANGED",
    RESOLUTION_FETCHED: "RESOLUTION_FETCHED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.VIEW_CHANGED:
      return { ...state, view: action.value };
    case types.SORT_CHANGED:
      return { ...state, sort: action.value };
    case types.USER_VOTED:
      return { ...state };
    case types.RESOLUTION_FETCHED:
      return {
        ...state,
        loading: false,
        resolutions: action.resolutions,
        sortInfo: action.sortInfo,
      };
    default:
      return { ...state };
  }
};

export default function Home({ ual, eosAccountName }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const cardOnClick = (id) => {
    router.push("/proposal/" + id);
  };

  useEffect(() => {
    getProposals(eosAccountName).then((value) => {
      dispatch({
        type: types.RESOLUTION_FETCHED,
        resolutions: value.rows,
        sortInfo: { more: value.more, next_key: value.next_key, page: 0 },
      });
    });
  }, []);

  const fetchResolutinInfo = (page) => {
    getProposals(eosAccountName, state.sortInfo.next_key).then((value) => {
      dispatch({
        type: types.RESOLUTION_FETCHED,
        resolutions: value.rows,
        sortInfo: { more: value.more, next_key: value.next_key, page },
      });
    });
  };

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
        {state.loading ? (
          <Loading />
        ) : (
          <>
            <Box sx={{ float: "right", display: "flex" }}>
              <Box sx={{ display: "flex", marginRight: "10px" }}>
                <Typography
                  component="span"
                  sx={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginRight: "10px",
                  }}
                >
                  Sort by
                </Typography>
                <NativeSelect
                  defaultValue={"Date"}
                  onChange={(e) => {
                    dispatch({
                      type: types.SORT_CHANGED,
                      value: e.target.value,
                    });
                  }}
                >
                  <option value={"Date"}>Date</option>
                  <option value={"Vote"}>Vote</option>
                </NativeSelect>
              </Box>

              <IconButton
                color={state.view === "listView" ? "secondary" : "primary"}
                aria-label="List view button"
                component="span"
                onClick={() => {
                  dispatch({ type: types.VIEW_CHANGED, value: "listView" });
                }}
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
              <Grid item md={6} sx={{ width: 1, marginLeft: { xs: "24px" } }}>
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
            <Box sx={{ marginTop: "10px" }}>
              <Stack direction="row">
                <IconButton
                  color={"primary"}
                  aria-label="Back navigation button"
                  sx={{ marginLeft: "auto" }}
                  disabled={state.sortInfo.page <= 0}
                  onClick={() => {
                    fetchResolutinInfo(state.sortInfo.page - 1);
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                  color={"primary"}
                  aria-label="Next navigation button"
                  disabled={!state.sortInfo.more}
                  onClick={() => {
                    fetchResolutinInfo(state.sortInfo.page + 1);
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </Stack>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  
  return {
    props: {
      eosAccountName: process.env.EOS_ACCOUNT_NAME,
    }, // will be passed to the page component as props
  };
}
