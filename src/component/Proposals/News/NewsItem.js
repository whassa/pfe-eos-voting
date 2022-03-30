import {
    Grid,
    Box,
    Paper,
    IconButton,
    Typography,
    Stack,
    Item,
    TextField,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input
} from "@mui/material";
import {
    updateSingleNews,
} from "../../../utils/ContractActions/Contract";
import { useTheme } from "@mui/styles";
import { useState, useReducer } from "react";




const types = {
    ALLOW_EDIT: "ALLOW_EDIT",
    CANCEL_EDIT: "CANCEL_EDIT",
    UPDATE_NEWS: "UPDATE_NEWS",
    NEWS_NOT_UPDATED: "NEWS_NOT_UPDATED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    TITLE_CHANGED: "TITLE_CHANGED"

};

const reducer = (state, action) => {
    switch (action.type) {
        case types.UPDATE_NEWS:
            return { ...state };
        case types.NEWS_NOT_UPDATED:
            return { ...state, content: action.value };
        case types.CONTENT_CHANGED:
            return { ...state, content: action.value };
        case types.ALLOW_EDIT:
            return { ...state, allowEdit: true };
        case types.CANCEL_EDIT:
            return { ...state, allowEdit: false};
        case types.TITLE_CHANGED:
            return { ...state, title: action.value };
        default:
            return { ...state };
    }
};
export default function NewsItem({ singleNew, resolutionAuthor, ual, resolutionId, oldData, refreshNews }) {
    const initialState = {
        content: oldData.oldContent,
        title: oldData.oldTitle,
        oldTitle: oldData.oldTitle,
        allowEdit: false,
        snackBarOpen: false,
        snackBarMessage: "",
        snackBarStatus: "error",
    };

    const theme = useTheme();
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("voici la single new")
    console.log(singleNew)
    console.log("voici l'author" + resolutionAuthor)
    console.log(ual.activeUser.accountName === resolutionAuthor)

    function handleClose(){
        dispatch({ type: types.CANCEL_EDIT, value: false });
    }

    function updateNews(){
        updateSingleNews(ual, {oldTitle: state.oldTitle, title: state.title, content: state.content, primaryKey: resolutionId}, ual.activeUser.accountName)
            .then(() => {
                handleClose();
                refreshNews();
            }).catch(error => {
                console.log(error)
        })
    }

    return (
        <Paper
            elevation={3}
            padding="dense"
            sx={{ padding: "10px", marginTop: "20px", width: '100%' }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography variant="h5" display="block">
                    {singleNew.title}
                </Typography>
                <Typography
                    display="block"
                    variant="caption"
                    sx={{
                        color: theme.palette.grey[400],
                        marginTop: "-2px",
                    }}
                >
                    {singleNew.createdAt.split("T")[0]}
                </Typography>
                <Typography display="block" sx={{ marginTop: "5px" }}>
                {singleNew.content}
                </Typography>
                <Stack spacing={2} direction="row">
                {(ual.activeUser.accountName === resolutionAuthor) && (
                <Button
                    sx={{ marginTop: "5px" }}
                    disabled={
                        resolutionAuthor !== ual.activeUser.accountName
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
                                You are currently editing a <b>News</b> post. You may change the title and its content.
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
                            <Button onClick={updateNews}>Update</Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Box>
        </Paper>
    );
}
