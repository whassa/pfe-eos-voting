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
                        border: 1,
                        borderColor: 'grey.500',
                        bgcolor: 'common.white',
                        width: 300,
                        height: 200
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
                        border: 1,
                        borderColor: 'grey.500',
                        bgcolor: 'common.white',
                        width: 300,
                        height: 100
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
                        border: 1,
                        borderColor: 'grey.500',
                        bgcolor: 'common.white',
                        width: 300,
                        height: 100
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
