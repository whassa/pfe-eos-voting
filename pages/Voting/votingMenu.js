import {
    Button,
    Container,
    Divider,
    Grid,
    Icon,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

async function doTestTransaction(){
    //TODO:
}

export default function votingListComponent() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid item md={6}>
                <Container maxWidth="sm">
                    <Paper elevation={3} padding="dense">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Button onClick={doTestTransaction()} fullWidth variant="contained">
                                    Test Transaction
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
}