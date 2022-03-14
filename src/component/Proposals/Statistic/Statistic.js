import { Grid, Paper, Stack, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/styles";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Chart from "./Chart";

dayjs.extend(relativeTime);

export default function Statistics({ resolution }) {
    const theme = useTheme();
    let prosVotes = 0;
    let consVotes = 0;
    let refrainVotes = 0;

    resolution &&
        resolution.votes &&
        resolution.votes.vote &&
        resolution.votes.vote.map((vote) => {
            if (vote.value === 0) {
                refrainVotes++;
            } else if (vote.value === 1) {
                prosVotes++;
            } else {
                consVotes++;
            }
        });

    return (
        <Box sx={{ marginTop: theme.homeMarginTop }}>
            <Stack direction="row" spacing={2}>
                <Paper
                    elevation={3}
                    padding="dense"
                    sx={{ padding: "10px", flex: 1 }}
                >
                    <Typography>Total votes</Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            color: theme.palette.colors.coolSage,
                            fontSize: "64px",
                        }}
                    >
                        {prosVotes - consVotes}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: "center" }}
                    >
                        <Box>
                            <Typography>Yes</Typography>
                            <Typography sx={{ textAlign: "center" }}>
                                {prosVotes}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>No</Typography>
                            <Typography sx={{ textAlign: "center" }}>
                                {consVotes}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>Refrain</Typography>
                            <Typography sx={{ textAlign: "center" }}>
                                {refrainVotes}
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                <Paper
                    elevation={3}
                    padding="dense"
                    sx={{ padding: "10px", flex: 1 }}
                >
                    <Typography>Vote margin</Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            color: theme.palette.colors.coolSage,
                            fontSize: "64px",
                        }}
                    >
                        {prosVotes / resolution.voteMargin > 1
                            ? 100
                            : (prosVotes / resolution.voteMargin) * 100}
                        %
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                        {resolution.voteMargin} votes to pass
                    </Typography>
                </Paper>

                <Paper
                    elevation={3}
                    padding="dense"
                    sx={{ padding: "10px", flex: 1 }}
                >
                    <Typography>Remaining days</Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            color: theme.palette.colors.coolSage,
                            fontSize: "64px",
                        }}
                    >
                        {dayjs(resolution.expiredAt).diff(dayjs(), "day")}
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                        {resolution.expiredAt.split("T")[0]}
                    </Typography>
                </Paper>
            </Stack>
            <Box sx={{ marginTop: theme.homeMarginTop }}>
                <Paper elevation={3} padding="dense">
                    <Chart dataVotes={resolution.votes.vote} />
                </Paper>
            </Box>
        </Box>
    );
}
