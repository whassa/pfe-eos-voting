import { useEffect } from "react";
import { useRouter } from 'next/router'
import { Scatter } from "ual-scatter";
import { Anchor } from "ual-anchor";
import { UALProvider, withUAL } from "ual-reactjs-renderer";
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

// import { Ledger } from 'ual-ledger';

// https://docs.dfuse.io/eosio/public-apis/reference/network-endpoints/

// Get your chainId
// http://localhost:8888/v1/chain/get_info

const network = {
  chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
  rpcEndpoints: [{ protocol: "http", host: "localhost", port: 8888 }],
};

export default function loginComponent({ ual }) {
  
  const router = useRouter();


  useEffect(() => {
    if (ual.activeUser) {
      router.push('/');
    }
  }, [ual.activeUser]);

  if (ual.activeUser) return null;

  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", padding: '16px', marginTop: '70px' }}
    >
        <Grid item md={6}>
        <Container maxWidth="sm">
            <Paper elevation={3} padding="dense">
            <Grid container spacing={3} style={{padding: '12px'}}>
                <Grid item xs={12}>
                  <img alt="Cryptosys Logo" src="Login/cryptosys_logo.png" style={{ maxWidth: '100%', maxHeight: '250px'}}/>
                </Grid>
                <Grid item xs={12}>
                <Button onClick={ual.showModal} fullWidth variant="contained">
                    <Icon>
                      <img alt="wallet-login" src="Login/eos-logo.svg" />
                    </Icon>
                    Login
                </Button>
                </Grid>
            </Grid>
            </Paper>
        </Container>
        </Grid>
    </Grid>
    );
}

export function LoginWrapper({ children }) {
  const appName = "Eos voting";
  const scatter = new Scatter([network], { appName });
  const anchor = new Anchor([network], { appName });

  return (
    <UALProvider chains={[network]} authenticators={[anchor]} appName={appName}>
      {children}
    </UALProvider>
  );
}
