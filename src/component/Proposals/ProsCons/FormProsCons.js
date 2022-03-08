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
    Input,
} from "@mui/material";
import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/styles";
import {
    argumentTemplate,
    createArgument,
} from "../../../utils/ContractActions/Contract";
import dayjs from "dayjs";

const initialState = {
    title: "",
    content: "",
    position: "",
};

const types = {
    TITLE_CHANGED: "TITLE_CHANGED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    POSITION_CHANGED: "POSITION_CHANGED",
    CANCEL_CLICKED: "CANCEL_CLICKED",
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.TITLE_CHANGED:
            return { ...state, title: action.value };
        case types.CONTENT_CHANGED:
            return { ...state, content: action.value };
        case types.POSITION_CHANGED:
            return { ...state, position: action.value };
        case types.CANCEL_CLICKED:
            return {
                ...state,
                title: initialState.title,
                content: initialState.content,
                position: initialState.position,
            };
        default:
            return { ...state };
    }
};

export default function FormProsCons({ ual, resolution, privateKey, eosAccountName }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const theme = useTheme();

    function createProsCons() {
        //TODO send it to GunJS and contract
        const argument = {
            ...argumentTemplate,
            id: BigInt("0x" + uuidv4().replace(/-/g, "")),
            //changer pour .primaryKey
            proposalID: resolution.id,
            title: state.title,
            content: state.content,
            value: state.position,
            author: {
                userName: ual.activeUser.accountName,
                userPublicKey: ual.activeUser.session.publicKey.data.array,
            },
        };

        createArgument(ual, argument, privateKey, eosAccountName);
    }

    return (
        <Paper
            elevation={3}
            padding="dense"
            sx={{ marginTop: "20px", padding: "10px" }}
        >
            <FormControl sx={{ width: "100%" }}>
                <Input
                    id="Title"
                    label="Title"
                    placeholder="Title"
                    onChange={(e) => {
                        dispatch({
                            type: types.TITLE_CHANGED,
                            value: e.target.value,
                        });
                    }}
                    value={state.title}
                    sx={{ marginBottom: "10px", maxWidth: "200px" }}
                    fullWidth={false}
                    required
                />

                <TextField
                    label="Content"
                    onChange={(e) => {
                        dispatch({
                            type: types.CONTENT_CHANGED,
                            value: e.target.value,
                        });
                    }}
                    value={state.content}
                    multiline
                    fullWidth
                    required
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ marginTop: "10px" }}
                >
                    <Grid item>
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
                                value={true}
                                control={<Radio />}
                                label="Pro"
                            />
                            <FormControlLabel
                                value={false}
                                control={<Radio />}
                                label="Con"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item>
                        <Stack spacing={2} direction="row">
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
                            <Button
                                onClick={(e) => {
                                    dispatch({ type: types.CANCEL_CLICKED });
                                }}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </FormControl>
        </Paper>
    );
}
