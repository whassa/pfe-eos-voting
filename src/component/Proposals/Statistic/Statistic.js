import {
    Grid,
    Paper
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
                <Paper elevation={3} padding="dense">
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
                </Paper>
            </Grid>

            <Grid>
                <Paper elevation={3} padding="dense">
                    <Grid>Vote margin</Grid>
                    <Grid>???</Grid>
                    <Grid>???</Grid>
                </Paper>
            </Grid>

            <Grid>
                <Paper elevation={3} padding="dense">
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
                </Paper>
            </Grid>

            <Grid>
                <Paper elevation={3} padding="dense">
                    <Grid>This is a chart</Grid>
                    <Grid>STONK</Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}
