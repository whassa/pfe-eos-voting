import {
    Grid,
    Paper,
    Stack,
    Typography,
    Box,
} from "@mui/material";
import { useTheme } from "@mui/styles";

export default function Statistics({ resolution }) {
    const theme = useTheme();
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
        <Box sx={{ marginTop: theme.homeMarginTop }} >
            <Stack direction="row" spacing={2} >
                <Paper elevation={3} padding="dense" sx={{ padding: '10px', flex: 1 }}>
                    <Typography>Total votes</Typography>
                    <Typography sx={{ textAlign: 'center', color: theme.palette.colors.coolSage, fontSize: '64px'}}>{prosVotes - consVotes}</Typography>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center'}}>
                        <Stack>
                            <Typography>
                                Yes
                            </Typography>
                            <Typography sx={{textAlign: 'center'}}>
                                {prosVotes}
                            </Typography>
                        </Stack>
                        <Stack>
                            <Typography>
                                No
                            </Typography>
                            <Typography sx={{textAlign: 'center'}}>
                                {consVotes}
                            </Typography>
                        </Stack>
                    </Stack>
                </Paper>

                <Paper elevation={3} padding="dense"  sx={{ padding: '10px', flex: 1 }}>
                    <Typography>Vote margin</Typography>
                    <Typography>???</Typography>
                    <Typography>???</Typography>
                </Paper>

                <Paper elevation={3} padding="dense"  sx={{ padding: '10px', flex: 1 }}>
                    <Typography>Remaining days</Typography>
                    <Typography>
                        {Math.ceil(
                            Math.abs(resolution.expireAt._d - Date.now()) /
                                (1000 * 60 * 60 * 24)
                        )}
                    </Typography>
                    <Typography>
                        {resolution.expireAt._d.toLocaleString("default", {
                            month: "long",
                        })}{" "}
                        {resolution.expireAt._d.getDay()}{" "}
                        {resolution.expireAt._d.getFullYear()}
                    </Typography>
                </Paper>
            </Stack>
            <Box sx={{ marginTop: theme.homeMarginTop }}>
                <Paper elevation={3} padding="dense" >
                    <Typography>This is a chart</Typography>
                    <Typography>STONK</Typography>
                </Paper>
            </Box>
        </Box>
    );
}
