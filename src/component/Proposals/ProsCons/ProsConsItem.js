import { Grid, Paper, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/styles";
import { useState } from "react";

export default function ListProsCons({ argument }) {
    const theme = useTheme();

    let tmpVote = 0;
    argument.votes.items.map((vote) => {
            (vote.value ? tmpVote++ : tmpVote --)
        }
    )
    const [votes, setVotes] = useState(tmpVote);

    return (
        <Paper elevation={3} padding="dense">
            <Grid>{argument.title}</Grid>
            {/*TODO change for argument.author.userName*/}
            <Grid>
                {argument.member.user.displayName} -{" "}
                {argument.createdAt._d.toLocaleString()}
            </Grid>
            <Grid>{argument.content}</Grid>
            {/*TODO change for .value===1*/}
            {argument.pro ? (
                <AddCircleOutlineIcon />
            ) : (
                <RemoveCircleOutlineIcon />
            )}
            <IconButton onClick={() => {setVotes(votes+1)}}>
                <ArrowCircleUpIcon />
            </IconButton>
            <Grid>{votes}</Grid>
            <IconButton  onClick={() => {setVotes(votes-1)}}>
                <ArrowCircleDownIcon />
            </IconButton>
        </Paper>
    );
}
