import * as React from 'react';
import {useReducer} from 'react';
import Menu, {drawerWidth} from "component/Menu/Menu";
import Header from "component/Head/Header";
import {Box, Container, FormControl, Input, InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import uuid from 'uuid-int';
import setupContract from "../contracts/contract";
import {useRouter} from "next/router";

const actionType = {
  CHANGE_TITLE: "CHANGE_TITLE",
    CHANGE_SUMMARY: "CHANGE_SUMMARY",
    CHANGE_CONTENT: "CHANGE_CONTENT",
    CHANGE_CATEGORY: "CHANGE_CATEGORY",
  COLOR: "COLOR",
};

const id = 0;
const generator = uuid(id);

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.CHANGE_TITLE:
        return { ...state, title: action.title };
    case actionType.CHANGE_SUMMARY:
        return {...state, summary: action.summary};
    case actionType.CHANGE_CONTENT:
        return {...state, content: action.content}
    case actionType.CHANGE_CATEGORY:
        return {...state, category: action.category}
  }
};


const initialState = {
};

export async function getStaticProps(context) {
    return {
        props: {privateKey: process.env.PRIVATE_KEY,
            eosAccountName: process.env.EOS_ACCOUNT_NAME}, // will be passed to the page component as props
    }
}

export default function Vote({ ual, privateKey, eosAccountName}) {
    let contract;
    const router = useRouter();
    setupContract(privateKey, eosAccountName).then((value)=>{console.log(value);contract=value}).catch((error) => console.log("YO" + error))
  const [state, dispatch] = useReducer(reducer, initialState);
    const categories = {
        default: "-",
        eos: "eos",
        eden: "eden",
        transaction: "transaction",
        eosstudio: "eos-studio"
};
    async function createProposal() {
        function buildProposalTemplate() {
            console.log(ual)
            return {
                primaryKey: generator.uuid(),
                title: state.title,
                summary: state.summary,
                content: state.content,
                category: state.category+"",
                status: "open",
                author: {
                    publicKey: ual.activeUser.session.publicKey.data.hexString,
                    userName: ual.activeUser.accountName
                }
            };
        }

        function verifyProposal(proposal) {
            var isValid = true;
            for (var key in proposal) {
                // skip loop if the property is from prototype
                if (!proposal.hasOwnProperty(key)) continue;

                var obj = proposal[key];
                if (obj !== undefined && obj !== null && obj !== '') {
                    continue;
                } else {
                    isValid = false;
                    break;
                }
            }
            return isValid
        }
        console.log("pre-building proposal")
        var proposal = buildProposalTemplate();
        console.log("proposal built:")
        console.log(proposal)
        if (verifyProposal(proposal)) {
            console.log("validation done")
            console.log(contract)
            await contract.api.transact(
                {
                    actions: [
                        {
                            account: ual.activeUser.accountName, //env variable
                            name: 'crtproposal',
                            authorization: [
                                {
                                    actor: ual.activeUser.accountName,
                                    permission: 'active',
                                },
                            ],
                            data: {
                                from: ual.activeUser.accountName,
                                primaryKey: proposal.primaryKey,
                                title: proposal.title,
                                summary: proposal.title,
                                content: proposal.content,
                                category: proposal.category,
                                status: proposal.status,
                                author: proposal.author
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            ).then((value) => console.log(contract),router.push("/")).catch((error) => console.log("YO" + error))
            console.log("transaction done");
        } else {
            console.log("invalid proposal");
        }
    }


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
                '& > :not(style)': { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
            <FormControl id="test123">
                <InputLabel htmlFor="Title">Title of the proposal</InputLabel>
                <Input
                id="Title"
                value={state.title}
                onChange={(e) => {
                    dispatch({
                    type: actionType.CHANGE_TITLE,
                    title: e.target.value,
                    });
                }}
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="Summary">Summary</InputLabel>
                <Input
                    id="Summary"
                    value={state.summary}
                    onChange={(e) => {
                        dispatch({
                            type: actionType.CHANGE_SUMMARY,
                            summary: e.target.value,
                        });
                    }}
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="Content">Content</InputLabel>
                <Input
                    id="Content"
                    value={state.content}
                    onChange={(e) => {
                        dispatch({
                            type: actionType.CHANGE_CONTENT,
                            content: e.target.value,
                        });
                    }}
                />
            </FormControl>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Categories
                    </InputLabel>
                    <Select
                        id="Categories"
                        label="Age"
                        displayEmpty={true}
                        onChange={(e) => {
                            dispatch({
                                type: actionType.CHANGE_CATEGORY,
                                category: e.target.value,
                            });
                        }}
                    >
                        <MenuItem value={categories.eos}>{categories.eos}</MenuItem>
                        <MenuItem value={categories.eden}>{categories.eden}</MenuItem>
                        <MenuItem value={categories.transaction}>{categories.transaction}</MenuItem>
                        <MenuItem value={categories.eosstudio}>{categories.eosstudio}</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    onClick={createProposal}
                >
                    Create Proposal
                </Button>
        </Box>
        )}
      </Container>
    </>
  );
}
