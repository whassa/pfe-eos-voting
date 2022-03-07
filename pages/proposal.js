import * as React from "react";
import { useReducer } from "react";
import Menu, { drawerWidth } from "component/Menu/Menu";
import Header from "component/Head/Header";
import { Box, Container, FormControl, InputLabel, Input } from "@mui/material";
import ProposalForm from "../src/component/Proposals/Form/ProposalForm";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";



export default function Vote({ ual, privateKey, eosAccountName }) {
    return (
        <>
            <Header></Header>
            <Menu ual={ual} />
            <Container
                sx={{
                    width: { xs: `calc(100% - ${drawerWidth}px)` },
                    paddingLeft: { xs: "120px" },
                    paddingTop: { xs: "40px" },
                }}
            >
                {ual.activeUser && (
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <ProposalForm ual={ual} privateKey={privateKey} eosAccountName={eosAccountName}></ProposalForm>
                    </Box>
                )}
            </Container>
        </>
    );
}


export async function getStaticProps(context) {
    return {
        props: {
            privateKey: process.env.PRIVATE_KEY,
            eosAccountName: process.env.EOS_ACCOUNT_NAME,
        },
    };
};
