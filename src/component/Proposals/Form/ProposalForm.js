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
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
    formTemplate,
    createProposal,
    getProposal,
    updateProposal
} from "../../../utils/ContractActions/Contract";
import SnackbarAlert from "common/SnackbarAlert/snackbarAlert";
import UserList from './UserList';
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
    VOTETYPE_CHANGED: "VOTETYPE_CHANGED",
    RESOLUTION_FETCHED: "RESOLUTION_FETCHED",
    WHITELIST_CHANGED: "WHITELIST_CHANGED",
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
        case types.VOTEMARGIN_CHANGED:
            return { ...state, voteMargin: action.value };
        case types.WHITELIST_CHANGED:
            return { ...state, whiteList: action.value };
        case types.VOTETYPE_CHANGED:
            return { ...state, voteType: action.value };
        case types.SUBMIT_BUTTON_CLICKED:
            return { ...state, submitDisable: true };
        case types.SUBMIT_BUTTON_RESPONSE:
            return { ...state, submitDisable: false };
        case types.RESOLUTION_FETCHED:
            return {
                ...state,
                title: action.title,
                summary: action.summary,
                content: action.content,
                category: action.category,
                voteMargin: action.voteMargin,
                expirationDate: action.expirationDate,
                ...(action.whiteList && action.whiteList.length === 0 ?
                    {
                        voteType: "Public",
                        whiteList: [],
                    }
                    : (action.whiteList.length === 1 && action.whiteList[0] && action.whiteList[0] === 'eden' ?
                    {
                        voteType: "Eden",
                        whiteList: [],
                    }
                    : {
                        voteType: "Custom",
                        whiteList: (action.whiteList ? action.whiteList : []),
                    })
                )
            };

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
    voteType: "Public",
    whiteList: [],
    expirationDate: "",
    submitDisable: false,
    error: "",
    open: false,
    formType: 'create',
    proposalId: null,
};

export default function proposalForm({ ual, eosAccountName }) {

    const router = useRouter();

    if (router.query.update && router.query.proposal) {
        initialState.formType = 'update';
        initialState.proposalId = router.query.proposal;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const sendForm = () => {
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
            ...( state.formType === 'update' ? {primaryKey: Number(state.proposalId)} : {}),
        };

        console.log(state.voteType);
        switch (state.voteType) {
            case 'Public': 
                formInformations.whiteList = []; break;
            case 'Eden': 
            //TODO change logic when eden is implemented
                formInformations.whiteList = ['eden']; break;
            case 'Custom': 
                formInformations.whiteList = state.whiteList; break;
            default:
                formInformations.whiteList = []; break;
                
        }

        if (state.formType === 'update') {
            updateProposal(ual, formInformations, eosAccountName)
            .then(() => {
                dispatch({
                    type: types.SUBMIT_BUTTON_RESPONSE,
                });
                router.push("/proposal/"+state.proposalId);
            })
            .catch((error) => {
                dispatch({
                    value: error instanceof String ? error : error.toString(),
                    type: types.ERROR_FORM_RESPONSE,
                });
            });
        } else  {
            createProposal(ual, formInformations, eosAccountName)
            .then(() => {
                dispatch({
                    type: types.SUBMIT_BUTTON_RESPONSE,
                });
                router.push("/");
            })
            .catch((error) => {
                dispatch({
                    value: error instanceof String ? error : error.toString(),
                    type: types.ERROR_FORM_RESPONSE,
                });
            });
        }
    };

    const valueArguments = (array) => {
        dispatch({
            type: types.WHITELIST_CHANGED,
            value: array,
        });
    };

    if (router.query.update && router.query.proposal) {
        useEffect( () => {
            getProposal(router.query.proposal, eosAccountName).then( (value) => {
                dispatch({
                    type: types.RESOLUTION_FETCHED,
                    ...( value.rows[0] ? {
                        title: value.rows[0].title,
                        summary: value.rows[0].summary,
                        content: value.rows[0].content,
                        category: value.rows[0].category,
                        voteMargin: value.rows[0].voteMargin,
                        whiteList: value.rows[0].whitelist,
                        voteType: value.rows[0].voteType,
                        expirationDate: dayjs(value.rows[0].expiredAt).toDate(),
                    } : {})
                });
            }).catch((error) => {
                dispatch({
                    value: error instanceof String ? error : error.toString(),
                    type: types.ERROR_FORM_RESPONSE,
                });
            });
        }, []);
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
                                maxLength: 50,
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
                                maxLength: 200,
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
                                maxLength: 50,
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
                                e.target.value > 0 &&
                                !isNaN(e.target.value) &&
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
                                minDate={dayjs().toDate()}
                                required
                            />
                        </LocalizationProvider>

                        <RadioGroup
                            row
                            value={state.voteType}
                            onChange={(e) => {
                                dispatch({
                                    type: types.VOTETYPE_CHANGED,
                                    value: e.target.value,
                                });
                            }}
                        >
                            <FormControlLabel
                                value={"Public"}
                                control={<Radio />}
                                label="Public"
                            />
                            <FormControlLabel
                                value={"Eden"}
                                control={<Radio />}
                                label="Eden members only"
                            />
                            <FormControlLabel
                                value={"Custom"}
                                control={<Radio />}
                                label="Select users who can vote"
                            />
                        </RadioGroup>

                        {state.voteType === "Custom" && (
                          <UserList whiteList={state.whiteList} valueArguments={valueArguments} />
                        )}

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
                            {state.formType === 'update' ? 'Update' : 'Create'}
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
