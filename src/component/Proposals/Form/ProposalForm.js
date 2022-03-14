import {
    Grid,
    Paper,
    Container,
    FormControl,
    TextField,
    Button,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { v4 as uuidv4 } from "uuid";
import { useState, useReducer } from "react";
import { useRouter } from "next/router";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
    formTemplate,
    createProposal,
} from "../../../utils/ContractActions/Contract";
import SnackbarAlert from "common/SnackbarAlert/snackbarAlert";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const types = {
    TITLE_CHANGED: "TITLE_CHANGED",
    SUMMARY_CHANGED: "SUMMARY_CHANGED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    CATEGORY_CHANGED: "CATEGORY_CHANGED",
    EXPIRATION_DATE_CHANGED: "EXPIRATION_DATE_CHANGED",
    SUBMIT_BUTTON_CLICKED: "SUBMIT_BUTTON_CLICKED",
    SUBMIT_BUTTON_RESPONSE: "SUBMIT_BUTTON_RESPONSE",
    ERROR_FORM_RESPONSE: "ERROR_FORM_RESPONSE",
    CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
    VOTEMARGIN_CHANGED: "VOTEMARGIN_CHANGED",
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.TITLE_CHANGED:
            return { ...state, title: action.value };
        case types.SUMMARY_CHANGED:
            return { ...state, summary: action.value };
        case types.CONTENT_CHANGED:
            return { ...state, content: action.value };
        case types.CATEGORY_CHANGED:
            return { ...state, category: action.value };
        case types.TITLE_CHANGED:
            return { ...state, title: action.value };
        case types.VOTEMARGIN_CHANGED:
            return { ...state, voteMargin: action.value };
        case types.SUBMIT_BUTTON_CLICKED:
            return { ...state, submitDisable: true };
        case types.SUBMIT_BUTTON_RESPONSE:
            return { ...state, submitDisable: false };
        case types.ERROR_FORM_RESPONSE:
            return {
                ...state,
                submitDisable: false,
                error: action.value,
                open: true,
            };
        case types.CLOSE_SNACKBAR:
            return { ...state, open: false };
        case types.EXPIRATION_DATE_CHANGED:
            return { ...state, expirationDate: action.value };
    }
};

const initialState = {
    title: "",
    summary: "",
    content: "",
    category: "",
    voteMargin: 0,
    expirationDate: "",
    submitDisable: false,
    error: "",
    open: false,
};

export default function proposalForm({ ual, privateKey, eosAccountName }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    const sendForm = () => {
        //TODO send it to the contract
        dispatch({
            type: types.SUBMIT_BUTTON_CLICKED,
        });
        const formInformations = {
            ...formTemplate,
            title: state.title,
            summary: state.summary,
            content: state.content,
            category: state.category,
            voteMargin: state.voteMargin,
            expiredAt: dayjs(state.expirationDate).format(
                "YYYY-MM-DD HH:mm:ss"
            ),
            integrity: true,
            author: ual.activeUser.accountName,
            status: "Open",
        };

        createProposal(ual, formInformations, privateKey, eosAccountName)
            .then(() => {
                dispatch({
                    type: types.SUBMIT_BUTTON_RESPONSE,
                });
                router.push("/");
            })
            .catch((error) => {
                dispatch({
                    value: (error instanceof String ? error : error.toString()),
                    type: types.ERROR_FORM_RESPONSE,
                });
            });
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh", padding: "16px", marginTop: "70px" }}
        >
            <Container>
                <Paper
                    elevation={3}
                    padding="dense"
                    sx={{ padding: "10px", maxWidth: "500px", margin: "auto" }}
                >
                    <FormControl sx={{ width: "100%" }}>
                        <TextField
                            id="Title"
                            label="Title"
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
                            sx={{ marginBottom: "10px" }}
                            required
                        />

                        <TextField
                            label="Summary"
                            variant="outlined"
                            multiline
                            inputProps={{
                                maxLength: 200
                              }}
                            onChange={(e) => {
                                dispatch({
                                    type: types.SUMMARY_CHANGED,
                                    value: e.target.value,
                                });
                            }}
                            value={state.summary}
                            sx={{ marginBottom: "10px" }}
                            required
                        />

                        <TextField
                            label="Content"
                            variant="outlined"
                            onChange={(e) => {
                                dispatch({
                                    type: types.CONTENT_CHANGED,
                                    value: e.target.value,
                                });
                            }}
                            rows={4}
                            value={state.content}
                            sx={{ marginBottom: "10px" }}
                            multiline
                            required
                        />

                        <TextField
                            id="Category"
                            label="Category"
                            inputProps={{
                                maxLength: 50
                              }}
                            onChange={(e) => {
                                dispatch({
                                    type: types.CATEGORY_CHANGED,
                                    value: e.target.value,
                                });
                            }}
                            sx={{ marginBottom: "10px" }}
                            value={state.category}
                        />

                        <TextField
                            id="VoteMargin"
                            label="Vote Margin"
                            type="number"
                            onChange={(e) => {
                                e.target.value > 0 && !isNaN(e.target.value) &&
                                parseInt(Number(e.target.value)) ==
                                    e.target.value &&
                                !isNaN(parseInt(e.target.value, 10))
                                    ? dispatch({
                                          type: types.VOTEMARGIN_CHANGED,
                                          value: e.target.value,
                                      })
                                    : dispatch({
                                          type: types.VOTEMARGIN_CHANGED,
                                          value: 0,
                                      });
                            }}
                            sx={{ marginBottom: "10px" }}
                            value={state.voteMargin}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Expiration Date"
                                inputFormat="MM/dd/yyyy"
                                value={state.expirationDate}
                                onChange={(e) => {
                                    dispatch({
                                        type: types.EXPIRATION_DATE_CHANGED,
                                        value: e,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        sx={{ marginBottom: "10px" }}
                                    />
                                )}
                                required
                            />
                        </LocalizationProvider>
                        <Button
                            disabled={
                                state.title === "" ||
                                state.summary === "" ||
                                state.content === "" ||
                                state.expirationDate === "" ||
                                state.submitDisable
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                sendForm();
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Create
                        </Button>
                    </FormControl>
                </Paper>
                <SnackbarAlert
                    severity={"error"}
                    open={state.open}
                    onClose={() => {
                        dispatch({ type: types.CLOSE_SNACKBAR });
                    }}
                    message={state.error}
                />
            </Container>
        </Grid>
    );
}
