import { Grid, Paper, Stack, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/styles";
import Chart from "./Chart";

export default function Statistics({ resolution }) {
    const theme = useTheme();
    let prosVotes = 0;
    let consVotes = 0;
    let refrainVotes = 0;

    resolution &&
        resolution.votes &&
        resolution.votes.vote &&
        resolution.votes.vote.map((vote) => {
            if (vote.value == null) {
                refrainVotes++;
            } else if (vote.value) {
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
                        <Stack>
                            <Typography>Yes</Typography>
                            <Typography sx={{ textAlign: "center" }}>
                                {prosVotes}
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography>No</Typography>
                            <Typography sx={{ textAlign: "center" }}>
                                {consVotes}
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography>No</Typography>
                            <Typography sx={{ textAlign: "center" }}>
                                {refrainVotes}
                            </Typography>
                        </Stack>
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
                        ???
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>???</Typography>
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
                        {Math.ceil(
                            Math.abs(resolution.expiredAt.$d - Date.now()) /
                                (1000 * 60 * 60 * 24)
                        )}
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                    
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
