import * as React from "react";
import Faq from "react-faq-component";
import { Box, Container, Typography, Tabs, Tab, Button } from "@mui/material";
import Header from "../src/component/Head/Header";
import Menu, {drawerWidth} from "../src/component/Menu/Menu";

const data = {
    title: "EOS Voting User Guide (How it Works)",
    rows: [
        {
            title: "What is EOS Voting?",
            content: `EOS Voting is a platform where users can submit proposals, create arguments for them and then vote for them. Data is stored on the blockchain, 
            so votes are transparent and all transactions are recorded across the system. Using EOS Voting, we can pave way for direct democracy on subjects partaining to
            anything!`,
        },
        {
            title: "Viewing proposals",
            content:
                `EOS Voting's homepage is a list of ongoing proposals. Any user (logged in or not) can browse the proposals and see its contents by clicking on the
                <b>Home</b> tab. From there, only <b>logged in users</b> can vote on the proposal and vote on arguments.`
        },
        {
            title: "Arguments",
            content: `Logged in users can create arguments on proposals. Arguments are either a Pro or a Con, and define the selected. Once they are created,
            other users can vote for or against them. Arguments are a good way to highlight important aspects of a proposal.`,
        },
        {
            title: "What is the package version",
            content: <p>current version is 1.2.1</p>,
        },
    ],
};

const styles = {
    bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function guide({ual}){

return (
        <>
            <Header />
            <Menu ual={ual} />
            <Container
                sx={{
                    width: { xs: `calc(100% - ${drawerWidth}px)` },
                    paddingTop: { xs: "40px" },
                }}
            >
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
            </Container>
            </>
    );
};