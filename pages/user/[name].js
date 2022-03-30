import Image from "next/image";
import Menu, { drawerWidth } from "../../src/component/Menu/Menu";
import {
  Box,
  Container,
  Typography,
  Stack,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useReducer, useEffect } from "react";
import Header from "component/Head/Header";

import { getProposalsByUser } from "/src/utils/ContractActions/Contract";
import ListView from "/src/component/Proposals/Home/ListView/listView";
import GridView from "/src/component/Proposals/Home/GridView/gridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import Loading from "/src/common/Loading";
import { useRouter } from "next/router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const initialState = {
  position: "none",
  resolutions: null,
  loading: true,
  view: "listView",
  sortInfo: {
    page: 0,
    more: false,
    next_key: 0,
    old_next_key: null,
  },
};

const types = {
  USER_FOUND: "USER_FOUND",
  VIEW_CHANGED: "VIEW_CHANGED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.USER_FOUND:
      return {
        ...state,
        resolutions: action.resolutions,
        sortInfo: action.sortInfo,
        loading: false,
      };
    case types.VIEW_CHANGED:
      return { ...state, view: action.value };
    default:
      return { ...state };
  }
};

export default function pid({ ual, userName, eosAccountName }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    getProposalsByUser(userName, eosAccountName).then((value) => {
      dispatch({
        type: types.USER_FOUND,
        resolutions: value.rows,
        sortInfo: {
          ...state.sortInfo,
          more: value.more,
          next_key: value.next_key,
          old_next_key: value.next_key,
          page: state.sortInfo.page,
        },
      });
    });
  }, []);

  const fetchResolutinInfo = (page) => {
    getProposalsByUser(
      userName,
      eosAccountName,
      state.sortInfo.next_key
    ).then((value) => {
      dispatch({
        type: types.USER_FOUND,
        resolutions: value.rows,
        sortInfo: {
          ...state.sortInfo,
          more: value.more,
          next_key: value.next_key,
          old_next_key: state.sortInfo.next_key,
          page,
        },
      });
    });
  };

  const fetchResolutinInfoBack = (page) => {
    // since we reverse fetch we add to the big int instead of lowering
    const previous_key = (BigInt(state.sortInfo.old_next_key) + 1n).toString();

    getProposalsByUser(
      userName,
      eosAccountName,
      previous_key,
    ).then((value) => {
      
      dispatch({
        type: types.USER_FOUND,
        resolutions: value.rows,
        sortInfo: {
          ...state.sortInfo,
          more: value.more,
          next_key: value.next_key,
          old_next_key: previous_key,
          page,
        },
      });
    });
  }

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
          <Loading />
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
            <Divider />
            {state.resolutions && state.resolutions.length >= 1 ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    Proposals created by the user :
                  </Typography>
                  <IconButton
                    color={state.view === "listView" ? "secondary" : "primary"}
                    aria-label="List view button"
                    component="span"
                    onClick={() => {
                      dispatch({ type: types.VIEW_CHANGED, value: "listView" });
                    }}
                    sx={{ marginLeft: "auto" }}
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
                  <Grid item md={6} sx={{ width: 1 }}>
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
                        fetchResolutinInfoBack(state.sortInfo.page - 1);
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
            ) : (
              <Typography variant="h6" sx={{ marginTop: "10px" }}>
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
