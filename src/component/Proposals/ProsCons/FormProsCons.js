import {
  Grid,
  Paper,
  Container,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useState, useReducer } from "react";

const types = {
  TITLE_CHANGED: "TITLE_CHANGED",
  CONTENT_CHANGED: "CONTENT_CHANGED",
  POSITION_CHANGED: "POSITION_CHANGED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.TITLE_CHANGED:
      return { ...state, title: action.value };
    case types.SUMMARY_CHANGED:
      return { ...state, summary: action.value };
    case types.POSITION_CHANGED:
      return { ...state, position: action.value === "Pro" ? true : false };
  }
};

const initialState = {
  title: "",
  content: "",
  position: "",
};

export default function formProsCons({ ual }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function createProsCons() {}
  function cancelProsCons() {
      state = {
        title: "",
        content: "",
        position: "",
      };
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", padding: "16px", marginTop: "70px" }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} padding="dense">
          <FormControl>
            <TextField
              id="Title"
              label="Title"
              onChange={(e) => {
                dispatch({ type: types.TITLE_CHANGED, value: e.target.value });
              }}
              value={state.title}
              required
            />

            <TextField
              label="Content"
              variant="outlined"
              multiline
              onChange={(e) => {
                dispatch({
                  type: types.CONTENT_CHANGED,
                  value: e.target.value,
                });
              }}
              value={state.content}
              required
            />

            <RadioGroup
              row
              defaultValue="first"
              onChange={(e) => {
                dispatch({
                  type: types.POSITION_CHANGED,
                  value: e.target.value,
                });
              }}
            >
              <FormControlLabel value="Pro" control={<Radio />} label="Pro" />
              <FormControlLabel value="Con" control={<Radio />} label="Con" />
            </RadioGroup>

            <Button
              onClick={(e) => {
                cancelProsCons();
              }}
              type="cancel"
              variant="contained"
            >
              Cancel
            </Button>

            <Button
              disabled={
                state.title === "" ||
                state.summary === "" ||
                state.content === "" ||
                state.expirationDate === ""
              }
              onClick={(e) => {
                e.preventDefault();
                createProsCons();
              }}
              type="submit"
              variant="contained"
            >
              Propose
            </Button>
          </FormControl>
        </Paper>
      </Container>
    </Grid>
  );
}