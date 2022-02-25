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
    Box,
} from "@mui/material";

export default function Statistics({ resolution }) {
    let prosVotes = 0;
    let consVotes = 0;

    resolution &&
        resolution.votes &&
        resolution.votes.items &&
        resolution.votes.items.forEach((vote) => {
            if (vote.value) {
                prosVotes++;
            } else {
                consVotes++;
            }
        });

    return (
        <Grid>
            <Grid>
                <Box
                    id="totalVote"
                    sx={{
                        width: 300,
                        height: 200,
                        backgroundColor: "grey.200",
                        "&:hover": {
                            backgroundColor: "primary.main",
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                    <Grid>Total votes</Grid>
                    <Grid>{prosVotes - consVotes}</Grid>
                    <Grid>
                        Yes
                        {prosVotes}
                    </Grid>
                    <Grid>
                        No
                        {consVotes}
                    </Grid>
                </Box>
            </Grid>

            <Grid>
                <Box
                    id="voteMargin"
                    sx={{
                        width: 300,
                        height: 200,
                        backgroundColor: "grey.200",
                        "&:hover": {
                            backgroundColor: "primary.main",
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                    <Grid>Vote margin</Grid>
                    <Grid>???</Grid>
                    <Grid>
                        ???
                    </Grid>
                </Box>
            </Grid>

            <Grid>
                <Box
                    id="remainingDays"
                    sx={{
                        width: 300,
                        height: 200,
                        backgroundColor: "grey.200",
                        "&:hover": {
                            backgroundColor: "primary.main",
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                    <Grid>Remaining days</Grid>
                    <Grid>
                        {Math.ceil(
                            Math.abs(resolution.expireAt._d - Date.now()) /
                                (1000 * 60 * 60 * 24)
                        )}
                    </Grid>
                    <Grid>
                        {resolution.expireAt._d.toLocaleString("default", {
                            month: "long",
                        })}{" "}
                        {resolution.expireAt._d.getDay()}{" "}
                        {resolution.expireAt._d.getFullYear()}
                    </Grid>
                </Box>
            </Grid>

            <Grid>
                <Box
                    id="voteMargin"
                    sx={{
                        width: 1080,
                        height: 500,
                        backgroundColor: "grey.200",
                        "&:hover": {
                            backgroundColor: "primary.main",
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                    <Grid>This is a chart</Grid>
                    <Grid>STONK</Grid>
                </Box>
            </Grid>
        </Grid>
    );
}
