
import Image from "next/image";
import styles from "../styles/Home.module.css";
import resolutions from "../src/component/Proposals/mockDataForTest";
import { useReducer } from "react";
import Menu, { drawerWidth } from "component/Menu/Menu";
import Header from "component/Head/Header";
import { Box, Container, FormControl, InputLabel, Input } from "@mui/material";

const actionType = {
  CHANGE_NAME: "CHANGE_NAME",
  COLOR: "COLOR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.CHANGE_NAME:
      return { ...state, name: action.name };
  }
};

const initialState = {
  name: "",
  pet: "cat",
};

export default function Vote({ ual }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        {ual.activeUser && (
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
            <FormControl>
                <InputLabel htmlFor="Name">Name of the vote</InputLabel>
                <Input
                id="Name"
                value={state.name}
                onChange={(e) => {
                    dispatch({
                    type: actionType.CHANGE_NAME,
                    name: e.target.value,
                    });
                }}
                />
            </FormControl>
        </Box>
        )}
      </Container>
    </>
  );
}