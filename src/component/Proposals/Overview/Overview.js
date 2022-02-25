import { Grid, Paper } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Overview({ resolution }) {
    console.log(resolution);
    return (
        <Grid>
            <Grid>{resolution.content}</Grid>
            <Grid>
                <Paper elevation={3} padding="dense">
                    <Grid>Author</Grid>
                    <Grid>
                        {resolution.author.userPicture === "" ? (
                            <AccountCircleIcon
                                sx={{
                                    width: 300,
                                    height: 125,
                                }}
                            />
                        ) : (
                            //TODO changer pour url picture of user
                            <AccountCircleIcon
                                sx={{
                                    width: 300,
                                    height: 125,
                                }}
                            />
                        )}
                    </Grid>
                    <Grid>
                        {/*TODO change it for .author.userName*/}
                        {resolution.author.user.displayName}
                    </Grid>
                </Paper>
            </Grid>
            <Grid>
                <Paper elevation={3} padding="dense">
                    <Grid>Details</Grid>
                    {/*TODO change it to .category*/}
                    <Grid>Category {resolution.category.name}</Grid>
                    {/*TODO change it to .createdAt*/}
                    <Grid>Created on {resolution.createdAt._i}</Grid>
                </Paper>
            </Grid>

            <Grid>
                <Paper elevation={3} padding="dense">
                    <Grid>Resolution integrity check</Grid>
                    {resolution.integrity ? (
                        <CheckCircleIcon
                            sx={{
                                width: 300,
                                height: 75,
                            }}
                        />
                    ) : (
                        <CancelIcon
                            sx={{
                                width: 300,
                                height: 75,
                            }}
                        />
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}
