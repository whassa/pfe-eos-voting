import * as React from "react";
import { useReducer } from "react";
import Menu, { drawerWidth } from "component/Menu/Menu";
import Header from "component/Head/Header";
import { Box, Container, FormControl, InputLabel, Input } from "@mui/material";
import ProposalForm from "../src/component/Proposals/Form/ProposalForm";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const actionType = {
    CHANGE_TITLE: "CHANGE_TITLE",
    CHANGE_SUMMARY: "CHANGE_SUMMARY",
    CHANGE_CONTENT: "CHANGE_CONTENT",
    CHANGE_CATEGORY: "CHANGE_CATEGORY",
    COLOR: "COLOR",
};

const id = 0;
const generator = uuidv4(id);

const reducer = (state, action) => {
    switch (action.type) {
        case actionType.CHANGE_TITLE:
            return { ...state, title: action.title };
        case actionType.CHANGE_SUMMARY:
            return { ...state, summary: action.summary };
        case actionType.CHANGE_CONTENT:
            return { ...state, content: action.content };
        case actionType.CHANGE_CATEGORY:
            return { ...state, category: action.category };
    }
};

const initialState = {};




export default function Vote({ ual, privateKey, eosAccountName }) {
    let contract;
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
   
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
