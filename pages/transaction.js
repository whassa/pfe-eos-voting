import setupContract from "../contracts/contract";

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


let contract
async function doTestTransaction(){
    //TODO: send transaction with balance
    console.log("--------- RPC ------------")
    console.log(contract.rpc)
    console.log("----------- CONTRACT API ----------")
    console.log(contract.api)
}
export async function getStaticProps(context) {
    return {
        props: {privateKey: process.env.PRIVATE_KEY}, // will be passed to the page component as props
    }
}

export default function transactionComponent({privateKey}) {
    contract = setupContract(privateKey)
    console.log(contract)
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