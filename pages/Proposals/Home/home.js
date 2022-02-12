import {
    Button,
    Box,
    Container,
    Divider,
    Grid,
    Icon,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import ListView from "./ListViewUi/listView";

//Mock data to test the frontEnd. Will have to change once we can read on the blockchain
import resolutions from "../mockDataForTest";

export default function votingMenuComponent() {
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
                    <ListView resolutions={resolutions} />
                </Container>
            </Grid>
        </Grid>
    );
}