import Image from "next/image";
import styles from "../styles/Home.module.css";
import resolutions from "../src/component/Proposals/mockDataForTest";
import { useReducer } from "react";
import Menu, { drawerWidth } from "component/Menu/Menu";
import Header from "component/Head/Header";
import { Box,Icon, Button, Container, Grid,Paper, FormControl, InputLabel, Input } from "@mui/material";
import ProposalForm from "../src/component/Proposals/Form/ProposalForm";
import InvitationIcon from "@mui/icons-material/Link";

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





export default function invitationLink({ ual }) {

  return (
    <>
      <Header></Header>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", padding: "16px", marginTop: "70px" }}
      >
        <Grid item md={6}>
          <Container maxWidth="sm">
            <Paper elevation={3} padding="dense">
              <Grid container spacing={3} style={{ padding: "12px" }}>
                <Grid item xs={12}>
                  <img
                    alt="Cryptosys Logo"
                    src="Login/cryptosys_logo.png"
                    style={{ maxWidth: "100%", maxHeight: "250px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={console.log("no")} fullWidth variant="contained">
                    Display Link
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

