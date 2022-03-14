import { Grid, Paper, Box, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useTheme } from "@mui/styles";
import dayjs from 'dayjs';

export default function Overview({ resolution }) {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{ marginTop: theme.homeMarginTop }}
        >
            <Box sx={{ flex: 1 }}>
                <Typography variant="h5" component="div">
                    {resolution.title}
                </Typography>
                <Box sx={{ marginTop: '5px' }}>

                    <Typography component="pre" sx={{ display: 'inline-block', verticalAlign: 'top', whiteSpace: 'pre-wrap' }}>
                        {resolution.content}
                    </Typography>
                </Box>
                
            </Box>
            <Box>
                <Paper
                    elevation={3}
                    padding="dense"
                    sx={{ padding: "10px", marginBottom: "30px" }}
                >
                    <Typography variant="h6" component="div">
                        Author
                    </Typography>
                    <Box>
                        <AccountCircleIcon
                            sx={{
                                width: 300,
                                height: 125,
                            }}
                        />
                    </Box>
                    <Typography component="div" sx={{ textAlign: "center" }}>
                        {/*TODO change it for .author.userName*/}
                        {resolution.author}
                    </Typography>
                </Paper>

                <Paper
                    elevation={3}
                    padding="dense"
                    sx={{ padding: "10px", marginBottom: "30px" }}
                >
                    <Typography variant="h6" component="div">
                        Details
                    </Typography>
                    {/*TODO change it to .category*/}
                    <Typography
                        component="div"
                        sx={{ textAlign: "center", marginTop: "10px" }}
                    >
                        Category {resolution.category}
                    </Typography>
                    {/*TODO change it to .createdAt*/}
                    <Typography component="div" sx={{ textAlign: "center" }}>
                        Created on {dayjs(resolution.createdAt).format('MM-DD-YYYY').toString()}
                    </Typography>
                </Paper>
            </Box>
        </Stack>
    );
}
