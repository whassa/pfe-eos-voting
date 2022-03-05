import { Grid, Paper, Box, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useTheme } from "@mui/styles";

export default function Overview({ resolution }) {
    const theme = useTheme();
    return (
        <Stack direction="row" spacing={1} sx={{ marginTop: theme.homeMarginTop }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h5" component="div">
                    {resolution.name} 
                </Typography>
                <Typography component="div" sx={{ marginTop: '5px'}}>
                    {resolution.content}
                </Typography>
            </Box>
            <Box>
                <Paper elevation={3} padding="dense" sx={{ padding: '10px', marginBottom: '30px' }}>
                    <Typography variant="h6" component="div" >Author</Typography>
                    <Box>
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
                    </Box>
                    <Typography  component="div" sx={{ textAlign: 'center'}}>
                        {/*TODO change it for .author.userName*/}
                        {resolution.author.user.displayName}
                    </Typography>
                </Paper>
                
                <Paper elevation={3} padding="dense"  sx={{ padding: '10px', marginBottom: '30px' }}>
                    <Typography variant="h6" component="div" >Details</Typography>
                    {/*TODO change it to .category*/}
                    <Typography component="div" sx={{ textAlign: 'center', marginTop: '10px'}}>Category {resolution.category.name}</Typography>
                    {/*TODO change it to .createdAt*/}
                    <Typography component="div" sx={{ textAlign: 'center'}}>Created on {resolution.createdAt._i}</Typography>
                </Paper>


                <Paper elevation={3} padding="dense"  sx={{ padding: '10px' }}>
                    <Typography variant="h6" component="div" >Resolution integrity check</Typography>
                    {resolution.integrity ? (
                        <CheckCircleOutlineIcon
                            sx={{
                                width: 300,
                                height: 75,
                                color: theme.palette.colors.success
                            }}
                        />
                    ) : (
                        <CancelOutlinedIcon
                            sx={{
                                width: 300,
                                height: 75,
                                color: theme.palette.colors.error
                            }}
                        />
                    )}
                </Paper>
            </Box>
        </Stack>
    );
}
