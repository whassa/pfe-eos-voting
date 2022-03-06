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
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

const types = {
    TITLE_CHANGED: "TITLE_CHANGED",
    SUMMARY_CHANGED: "SUMMARY_CHANGED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    CATEGORY_CHANGED: "CATEGORY_CHANGED",
    EXPIRATION_DATE_CHANGED: "EXPIRATION_DATE_CHANGED",
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
        case types.EXPIRATION_DATE_CHANGED:
            return { ...state, expirationDate: action.value };
    }
};

const initialState = {
    title: "",
    summary: "",
    content: "",
    category: "",
    expirationDate: "",
};

export default function proposalForm({ ual, privateKey, eosAccountName }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const sendForm = () => {
        //TODO send it to the contract
        const formInformations = {
            ...formTemplate,
            primaryKey: BigInt("0x" + uuidv4().replace(/-/g, "")),
            title: state.title,
            summary: state.summary,
            content: state.content,
            category: state.category,
            expiredAt: dayjs(state.expirationDate).format("YYYY-MM-DD HH:mm:ss"),
            integrity: true,
            author: {
                userName: ual.activeUser.accountName,
                publicKey: JSON.stringify(
                    ual.activeUser.session.publicKey.data.array
                ),
            },
            status: "Open",
        };

        console.log(formInformations);
        createProposal(ual, formInformations, privateKey, eosAccountName)
            .then(() => {
              console.log("success");
            })
            .catch((error) => {
                console.log(error);
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
                            label="Summary"
                            variant="outlined"
                            multiline
                            onChange={(e) => {
                                dispatch({
                                    type: types.SUMMARY_CHANGED,
                                    value: e.target.value,
                                });
                            }}
                            value={state.summary}
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

                        <TextField
                            id="Category"
                            label="Category"
                            onChange={(e) => {
                                dispatch({
                                    type: types.CATEGORY_CHANGED,
                                    value: e.target.value,
                                });
                            }}
                            value={state.category}
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
                                    <TextField {...params} />
                                )}
                                required
                            />
                        </LocalizationProvider>

                        <Button
                            disabled={
                                state.title === "" ||
                                state.summary === "" ||
                                state.content === "" ||
                                state.expirationDate === ""
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
            </Container>
        </Grid>
    );
}
