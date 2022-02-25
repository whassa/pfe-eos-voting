import {
    Grid,
    Paper,
    Container,
    FormControl,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Stack,
} from "@mui/material";
import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const types = {
    TITLE_CHANGED: "TITLE_CHANGED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    POSITION_CHANGED: "POSITION_CHANGED",
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.TITLE_CHANGED:
            return { ...state, title: action.value };
        case types.CONTENT_CHANGED:
            return { ...state, content: action.value };
        case types.POSITION_CHANGED:
            return { ...state, position: action.value };
        default:
            return { ...state };
    }
};

const initialState = {
    title: "",
    content: "",
    position: "",
};

export default function FormProsCons({ ual, resolution }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function createProsCons() {
        //TODO send it to GunJS and contract
        let argument = {
            id: uuidv4(),
            title: state.title,
            content: state.content,
            position: state.position,
            createdAt: new Date().toISOString(),
            author: {
                userName: ual.activeUser.accountName,
                userPublicKey: ual.activeUser.session.publicKey.data.array,
            },
            vote: {
                vote: 0, //votes by the users. I.E, -1 because positif vote - negatif vote = -1
                totalVote: 0, //how many people voted
                items: [], //all the votes. Each vote contains createdAt, userPublicKey, value (+1 or -1)
            },
        };

        resolution.arguments.push(argument);
    }

    function cancelProsCons() {
        state.title = "";
        state.content = "";
        state.position = "";
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
                                dispatch({
                                    type: types.TITLE_CHANGED,
                                    value: e.target.value,
                                });
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
                            defaultValue="Pro"
                            onChange={(e) => {
                                dispatch({
                                    type: types.POSITION_CHANGED,
                                    value: e.target.value,
                                });
                            }}
                        >
                            <FormControlLabel
                                value="Pro"
                                control={<Radio />}
                                label="Pro"
                            />
                            <FormControlLabel
                                value="Con"
                                control={<Radio />}
                                label="Con"
                            />
                        </RadioGroup>

                        <Stack spacing={2} direction="row">
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
                        </Stack>
                    </FormControl>
                </Paper>
            </Container>
        </Grid>
    );
}
