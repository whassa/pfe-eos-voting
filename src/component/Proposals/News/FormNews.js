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
    newsTemplate,
    createSingleNews,
} from "../../../utils/ContractActions/Contract";
import SnackbarAlert from "common/SnackbarAlert/snackbarAlert";
import dayjs from "dayjs";

const initialState = {
    title: "",
    content: "",
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarStatus: "error",
};

const types = {
    TITLE_CHANGED: "TITLE_CHANGED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    CANCEL_CLICKED: "CANCEL_CLICKED",
    NEWS_CREATED: "NEWS_CREATED",
    NEWS_NOT_CREATED: "NEWS_NOT_CREATED",
    CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.TITLE_CHANGED:
            return { ...state, title: action.value };
        case types.CONTENT_CHANGED:
            return { ...state, content: action.value };
        case types.CLOSE_SNACKBAR:
            return { ...state, snackBarOpen: false };
        case types.CANCEL_CLICKED:
            return {
                ...state,
                title: initialState.title,
                content: initialState.content,
            };
        case types.NEWS_CREATED:
            return {
                ...state,
                title: initialState.title,
                content: initialState.content,
                snackBarOpen: true,
                snackBarMessage: "News created successfully",
                snackBarStatus: "success",
            };
        case types.NEWS_NOT_CREATED:
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

export default function FormNews({
    ual,
    resolutionID,
    privateKey,
    eosAccountName,
    refreshNews,
}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const theme = useTheme();

    function createNews() {
        //TODO send it to GunJS and contract
        const news = {
            ...newsTemplate,
            //changer pour .primaryKey
            primaryKey: resolutionID,
            title: state.title,
            content: state.content,
            author: ual.activeUser.accountName,
        };
        
        createSingleNews(ual, news, privateKey, eosAccountName)
            .then(() => {
                dispatch({ type: types.NEWS_CREATED });
                refreshNews();
            })
            .catch((e) => {
                dispatch({ type: types.NEWS_NOT_CREATED,  value: (e instanceof String ? e : e.toString()), });
            });
    }

    return (
        <>
            <FormControl sx={{ width: "100%" }}>
                <Input
                    id="Title"
                    label="Title"
                    placeholder="Title"
                    inputProps={{
                        maxLength: 50,
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
                        <Stack spacing={2} direction="row">
                            <Button
                                disabled={
                                    state.title === "" || state.content === ""
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    createNews();
                                }}
                                type="submit"
                                variant="contained"
                            >
                                Create
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
            <SnackbarAlert
                severity={state.snackBarStatus}
                open={state.snackBarOpen}
                onClose={() => {
                    dispatch({ type: types.CLOSE_SNACKBAR });
                }}
                message={state.snackBarMessage}
            />
        </>
    );
}
