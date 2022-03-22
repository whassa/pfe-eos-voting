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
import SnackbarAlert from 'common/SnackbarAlert/snackbarAlert';
import dayjs from "dayjs";

const initialState = {
    title: "",
    content: "",
    position: "",
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarStatus: "error",
};

const types = {
    TITLE_CHANGED: "TITLE_CHANGED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    POSITION_CHANGED: "POSITION_CHANGED",
    CANCEL_CLICKED: "CANCEL_CLICKED",
    ARGUMENT_CREATED: "ARGUMENT_CREATED",
    ARGUMENT_NOT_CREATED: "ARGUMENT_NOT_CREATED",
    CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.TITLE_CHANGED:
            return { ...state, title: action.value };
        case types.CONTENT_CHANGED:
            return { ...state, content: action.value };
        case types.POSITION_CHANGED:
            return { ...state, position: action.value };
        case types.CLOSE_SNACKBAR:
            return { ...state, snackBarOpen: false };
        case types.CANCEL_CLICKED:
            return {
                ...state,
                title: initialState.title,
                content: initialState.content,
                position: initialState.position,                
            }; 
        case types.ARGUMENT_CREATED:
            return {
                ...state,
                title: initialState.title,
                content: initialState.content,
                position: initialState.position,
                snackBarOpen: true,
                snackBarMessage: "Argument created successfully",
                snackBarStatus: "success",
            };
        case types.ARGUMENT_NOT_CREATED:
            return {
                ...state,
                snackBarOpen: true,
                snackBarMessage: action.value,
                snackBarStatus: "error",
            };
        default:
            return { ...state };
    }
};

export default function FormProsCons({ ual, resolution, eosAccountName, refreshProsCons }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const theme = useTheme();

    function createProsCons() {
        //TODO send it to GunJS and contract
        const argument = {
            ...argumentTemplate,
            //changer pour .primaryKey
            proposalID: resolution.primaryKey,
            title: state.title,
            content: state.content,
            value: (state.position === "true" ? true:false),
        };
        createArgument(ual, argument, eosAccountName).then(() => {
            dispatch({ type: types.ARGUMENT_CREATED });
            refreshProsCons();
        }).catch((e) => {
            dispatch({ type: types.ARGUMENT_NOT_CREATED, value: (e instanceof String ? e : e.toString()) });
        });
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
                    inputProps={{
                        maxLength: 50
                      }}
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
                                    state.content === ""
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
            <SnackbarAlert severity={state.snackBarStatus} open={state.snackBarOpen}  onClose={() => { dispatch({type: types.CLOSE_SNACKBAR})}} message={state.snackBarMessage} />
        </Paper>
    );
}
