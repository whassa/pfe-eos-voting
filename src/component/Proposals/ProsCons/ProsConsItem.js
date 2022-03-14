import { Grid, Box, Paper, IconButton, Typography, Stack, Item} from "@mui/material";
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
    argument.votes.vote.map((vote) => {
            (vote.value ? tmpVote++ : tmpVote --)
        }
    )
    const [votes, setVotes] = useState(tmpVote);

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
                    <IconButton onClick={() => {setVotes(votes+1)}} sx={{ padding: '4px'}}>
                        <ArrowCircleUpIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                    <Typography sx={{ textAlign: 'center', marginTop: '-5px', marginBottom: '-5px'}}>{votes}</Typography>
                    <IconButton  onClick={() => {setVotes(votes-1)}} sx={{ padding: '4px'}}>
                        <ArrowCircleDownIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                </Box>
            </Stack>
          
            {/*TODO change for .value===1*/}
            
        </Paper>
    );
}
