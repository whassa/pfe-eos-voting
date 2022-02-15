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
async function vote(eosAccountName, contract){
    console.log(contract)
    await contract.api.transact(
        {
            actions: [
                {
                    account: eosAccountName, //env variable
                    name: 'vote',
                    authorization: [
                        {
                            actor: eosAccountName,
                            permission: 'active',
                        },
                    ],
                    data: {
                        from: eosAccountName
                    },
                },
            ],
        },
        {
            blocksBehind: 3,
            expireSeconds: 30,
        }
    ).then((value) => console.log(contract))
}

async function getVotes(eosAccountName, contract){
    console.log("getting votes...")
    const voteTable = await contract.rpc.get_table_rows({
        json: true,               // Get the response as json
        code: eosAccountName,      // Contract that we target
        scope: eosAccountName,         // Account that owns the data
        table: 'votes',        // Table name
        limit: 10,                // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
        show_payer: false          // Optional: Show ram payer
    })
    console.log(voteTable)
}

export async function getStaticProps(context) {
    return {
        props: {privateKey: process.env.PRIVATE_KEY,
                eosAccountName: process.env.EOS_ACCOUNT_NAME}, // will be passed to the page component as props
    }
}


export default function transactionComponent({privateKey, eosAccountName, ual}) {
    let contract;
    setupContract(privateKey, eosAccountName).then((value)=>{console.log(value);contract=value}).catch((error) => console.log("YO" + error))
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
                                <Button onClick={()=>{vote(eosAccountName, contract)}} fullWidth variant="contained">
                                    Vote
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={()=>{getVotes(eosAccountName, contract)}} fullWidth variant="contained">
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