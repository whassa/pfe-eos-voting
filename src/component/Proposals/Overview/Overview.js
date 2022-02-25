import {
    Grid,
    Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Overview({ resolution }) {
    console.log(resolution);
    return (
        <Grid>
            <Grid>{resolution.content}</Grid>
            <Grid>
                <Box
                    id="author"
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
                </Box>
            </Grid>
            <Grid>
                <Box
                    id="details"
                    sx={{
                        width: 300,
                        height: 100,
                        backgroundColor: "grey.200",
                        "&:hover": {
                            backgroundColor: "primary.main",
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
                    <Grid>Details</Grid>
                    {/*TODO change it to .category*/}
                    <Grid>Category {resolution.category.name}</Grid>
                    {/*TODO change it to .createdAt*/}
                    <Grid>Created on {resolution.createdAt._i}</Grid>
                </Box>
            </Grid>

            <Grid>
                <Box
                    id="integrity"
                    sx={{
                        width: 300,
                        height: 100,
                        backgroundColor: "grey.200",
                        "&:hover": {
                            backgroundColor: "primary.main",
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                >
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
                </Box>
            </Grid>
        </Grid>
    );
}
