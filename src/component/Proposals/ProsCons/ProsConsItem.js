import { useEffect, useReducer } from "react";
import {
    Box,
    Paper,
    IconButton,
    Typography,
    Stack,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, Input, TextField, DialogActions,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useTheme } from "@mui/styles";
import SnackbarAlert from 'common/SnackbarAlert/snackbarAlert';
import {
    argumentVoteTemplate,
    voteArgument,
    updateArgument,
} from "../../../utils/ContractActions/Contract";



const types = {
    ARGUMENT_VOTED: "ARGUMENT_VOTED",
    ARGUMENT_NOT_VOTED: "ARGUMENT_NOT_VOTED",
    TITLE_CHANGED: "TITLE_CHANGED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
    VOTE_CHANGE: "VOTE_CHANGE",
    ALLOW_EDIT: "ALLOW_EDIT",
    CANCEL_EDIT: "CANCEL_EDIT"
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.ARGUMENT_VOTED:
            return {
                ...state,
                snackBarOpen: true,
                snackBarMessage: "Argument Voted successfully",
                snackBarStatus: "success",
            };
        case types.TITLE_CHANGED:
            return { ...state, title: action.value };
        case types.CONTENT_CHANGED:
            return { ...state, content: action.value };
        case types.ARGUMENT_NOT_VOTED:
            return {
                ...state,
                snackBarOpen: true,
                snackBarMessage: action.value,
                snackBarStatus: "error",
            };
        case types.VOTE_CHANGE:
            return {
                ...state,
                vote: action.value,
            }
        case types.ALLOW_EDIT:
            return { ...state, allowEdit: true}
        case types.CANCEL_EDIT:
            return { ...state, allowEdit: false}
        case types.CLOSE_SNACKBAR:
            return { ...state, snackBarOpen: false };
        default:
            return { ...state };
    }
};



export default function ListProsCons({ ual, pid, argument, eosAccountName, refreshProsCons, canVote }) {
    const theme = useTheme();
    const initialState = {
        title: argument.title,
        content: argument.content,
        vote: 0,
        snackBarOpen: false,
        snackBarMessage: "",
        snackBarStatus: "error",
        allowEdit: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const voteForUser = (voteValue) => {
        const vote = {
            ...argumentVoteTemplate,
            proposalID: pid,
            argumentID: argument.primaryKey,
            value: voteValue,
        }
        voteArgument(ual, vote, eosAccountName).then(() => {
            dispatch({ type: types.ARGUMENT_VOTED });
            refreshProsCons();
        }).catch((e) => {
            dispatch({ type: types.ARGUMENT_NOT_VOTED, value: (e instanceof String ? e : e.toString()) });
        });
    }

    function handleClose(){
        dispatch({ type: types.CANCEL_EDIT, value: false });
    }

    function updateArg(){
        updateArgument(ual, {title: state.title, content: state.content, primaryKey: argument.primaryKey}, eosAccountName, pid)
            .then(() => {
                handleClose();
                refreshProsCons();
            }).catch(error => {
            console.log(error)
        })
    }
    useEffect( () => {
        if ( argument && argument.votes && argument.votes.vote)
        {
            const vote = argument.votes.vote.find((vote) => {
                if (
                    ual.activeUser.accountName === vote.user
                ) {
                    return vote;
                }
            });
            dispatch({
                type: types.VOTE_CHANGE,
                value: vote && vote.value,
            });
        }
    }, [argument]);

    return (
        <Paper elevation={3} padding="dense" sx={{padding: '10px', marginBottom: '5px'}}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
            >
                <Box sx={{ marginLeft: '10px', marginRight: '10px'}}>
                    {argument.value ? (
                        <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
                    ) : (
                        <RemoveCircleOutlineIcon sx={{ fontSize: 40 }} />
                    )}

                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" display="block">{argument.title}</Typography>
                    {/*TODO change for argument.author.userName*/}
                    <Typography display="block" variant="caption" sx={{ color: theme.palette.grey[400], marginTop: '-2px'}}>
                        {argument.author} -{" "}
                        {argument.createdAt}
                    </Typography>
                    <Typography display="block" sx={{ marginTop: '5px'}}>{argument.content}
                    </Typography>
                </Box>
                <Box sx={{ marginRight: '10px'}}>
                    <IconButton disabled={canVote} onClick={() => {voteForUser(1);}} sx={{ padding: '4px'}}>
                        <ArrowCircleUpIcon sx={{ fontSize: 24 }} color={(state.vote === 1 ? 'secondary' : 'primary')} />
                    </IconButton>
                    <Typography sx={{ textAlign: 'center', marginTop: '-5px', marginBottom: '-5px'}}>{argument.votes.actualVote}</Typography>
                    <IconButton  disabled={canVote} onClick={() => {voteForUser(-1);}} sx={{ padding: '4px'}}>
                        <ArrowCircleDownIcon sx={{ fontSize: 24 }} color={(state.vote === -1 ? 'secondary' : 'primary')}/>
                    </IconButton>
                </Box>
            </Stack>
            {(ual.activeUser.accountName === argument.author) && (
                <Button
                    sx={{
                        alignItems: 'right' }}
                    disabled={
                        argument.author !== ual.activeUser.accountName
                    }
                    onClick={() => {
                        dispatch({ type: types.ALLOW_EDIT });
                    }}
                    type="submit"
                    variant="contained"
                >
                    Edit
                </Button>)}
            <Dialog open={state.allowEdit} onClose={() => {handleClose}}>
                <DialogTitle>Update News</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are currently editing an <b>Argument</b> post. You may only change the title and its content.
                    </DialogContentText>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {handleClose()}}>Cancel</Button>
                    <Button onClick={updateArg}>Update</Button>
                </DialogActions>
            </Dialog>
            <SnackbarAlert severity={state.snackBarStatus} open={state.snackBarOpen}  onClose={() => { dispatch({type: types.CLOSE_SNACKBAR})}} message={state.snackBarMessage} />
        </Paper>
    );
}
