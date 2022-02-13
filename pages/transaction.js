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

function doTestTransaction(){
    console.log("----------- CONTRACT RPC/API OBJECT ---------------")
    console.log(contract)
}
//TODO: implement validation service before allowing vote
function vote(){
    console.log("voting...")
}

function getVotes(){
    console.log("getting votes...")
}


export async function getStaticProps(context) {
    contract = setupContract(process.env.PRIVATE_KEY, process.env.EOS_ACCOUNT_NAME)
    console.log(contract)
    return {
        props: {privateKey: process.env.PRIVATE_KEY,
                eosAccountName: process.env.EOS_ACCOUNT_NAME}, // will be passed to the page component as props
    }
}


export default function transactionComponent({privateKey, eosAccountName}) {
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
                                <Button onClick={doTestTransaction} fullWidth variant="contained">
                                    Get EOSContract Info
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={vote} fullWidth variant="contained">
                                    Vote
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={getVotes} fullWidth variant="contained">
                                    Get votes
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
}