import { Grid, Paper, Stack, Box, Divider, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useTheme } from "@mui/styles";

export default function ListBestProsCons({ prosList, consList }) {
    const theme = useTheme();

    return (
        <Paper elevation={3} padding="dense" sx={{ marginTop: theme.homeMarginTop, padding: '10px'}}>
            <Stack 
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Box  sx={{ flex: 1 }}>
                    <Typography variant="h5"> Pros </Typography>
                    {prosList &&
                        prosList.map((argument) => {
                            return (
                                <Box key={argument.primaryKey} sx={{paddingLeft: '20px'}}>
                                    {/*TODO changer .content par .title et items.length par .vote*/}
                                    <Typography>
                                        {argument.title}{" "}
                                        {argument.votes.actualVote}{" "}
                                        <ArrowCircleUpIcon />
                                    </Typography>
                                </Box>
                            );
                        })}
                </Box>
                <Box  sx={{ flex: 1 }}>
                    <Typography variant="h5"> Cons </Typography>
                    {consList &&
                        consList.map((argument) => {
                            return (
                                <Box key={argument.primaryKey} sx={{paddingLeft: '20px'}}>
                                    {/*TODO changer .content par .title et items.length par .vote*/}
                                    <Typography>
                                        {argument.title}{" "}
                                        {argument.votes.vote.length}{" "}
                                        <ArrowCircleDownIcon />
                                    </Typography>
                                </Box>
                            );
                        })}
                </Box>
            </Stack>
        </Paper>
    );
}
