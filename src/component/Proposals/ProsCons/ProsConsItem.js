import { useEffect, useReducer } from "react";
import { Box, Paper, IconButton, Typography, Stack,} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useTheme } from "@mui/styles";
import SnackbarAlert from 'common/SnackbarAlert/snackbarAlert';
import {
    argumentVoteTemplate,
    voteArgument,
} from "../../../utils/ContractActions/Contract";

const initialState = {
    vote: 0,
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarStatus: "error",
};

const types = {
    ARGUMENT_VOTED: "ARGUMENT_VOTED",
    ARGUMENT_NOT_VOTED: "ARGUMENT_NOT_VOTED",
    CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
    VOTE_CHANGE: "VOTE_CHANGE",
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
        case types.CLOSE_SNACKBAR:
            return { ...state, snackBarOpen: false };
        default:
            return { ...state };
    }
};



export default function ListProsCons({ ual, pid, argument, eosAccountName, refreshProsCons }) {
    const theme = useTheme();

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
                    <IconButton onClick={() => {voteForUser(1);}} sx={{ padding: '4px'}}>
                        <ArrowCircleUpIcon sx={{ fontSize: 24 }} color={(state.vote === 1 ? 'secondary' : 'primary')} />
                    </IconButton>
                    <Typography sx={{ textAlign: 'center', marginTop: '-5px', marginBottom: '-5px'}}>{argument.votes.actualVote}</Typography>
                    <IconButton  onClick={() => {voteForUser(-1);}} sx={{ padding: '4px'}}>
                        <ArrowCircleDownIcon sx={{ fontSize: 24 }} color={(state.vote === -1 ? 'secondary' : 'primary')}/>
                    </IconButton>
                </Box>
            </Stack>
            <SnackbarAlert severity={state.snackBarStatus} open={state.snackBarOpen}  onClose={() => { dispatch({type: types.CLOSE_SNACKBAR})}} message={state.snackBarMessage} />
        </Paper>
    );
}
