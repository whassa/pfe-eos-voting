import Image from "next/image";
import Menu, { drawerWidth } from "../../src/component/Menu/Menu";
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Button,
    Modal,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import { useState, useReducer } from "react";
import Header from "component/Head/Header";
import { styled } from "@mui/system";
import LiveChat from "../../src/component/Proposals/LiveChat/LiveChat";
import resolutions from "../../src/component/Proposals/mockDataForTest";
import ProsCons from "../../src/component/Proposals/ProsCons/ProsCons";
import Overview from "../../src/component/Proposals/Overview/Overview";
import Statistics from "component/Proposals/Statistic/Statistic";

const views = ["Overview", "Pros & Cons", "Statistics", "News", "Live Chat"];

const initialState = {
    view: views[0],
    open: false,
    position: "",
};

const types = {
    VIEW_CHANGED: "TITLE_CHANGED",
    OPEN_CHANGED: "CONTENT_CHANGED",
    POSITION_CHANGED: "POSITION_CHANGED",
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.VIEW_CHANGED:
            return { ...state, view: action.value };
        case types.OPEN_CHANGED:
            return { ...state, open: action.value };
        case types.POSITION_CHANGED:
            return { ...state, position: action.value };
        default:
            return { ...state };
    }
};

export default function pid({ ual, encryptionKey, pid }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const resolution = resolutions.find((res) => res.id === pid);

    //TODO Change for theme
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <>
            <Header />
            <Menu ual={ual} />
            <Container
                sx={{
                    width: { xs: `calc(100% - ${drawerWidth}px)` },
                    paddingLeft: { xs: "144px" },
                    paddingTop: { xs: "40px" },
                }}
            >
                {resolution ? (
                    <>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ marginLeft: "10px" }}>
                                <Image
                                    src="/Login/eos-logo.svg"
                                    alt="Eos logo"
                                    width={100}
                                    height={100}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    marginLeft: "10px",
                                }}
                            >
                                <Typography variant="h5">
                                    {/**TODO change it to .title*/}
                                    {resolution.name}
                                </Typography>
                                <Typography variant="h6">
                                    {/*TODO change it for .author.userName*/}
                                    {resolution.author.user.displayName}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    marginLeft: "auto",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ textTransform: "none" }}
                                    onClick={(e) => {
                                        dispatch({
                                            type: types.OPEN_CHANGED,
                                            value: true,
                                        });
                                    }}
                                >
                                    Vote for this Resolution
                                </Button>
                            </Box>
                            <Modal
                                open={state.open}
                                onClose={(e) => {
                                    dispatch({
                                        type: types.OPEN_CHANGED,
                                        value: true,
                                    });
                                }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{ ...style, width: 200 }}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        Please make your vote
                                    </Typography>
                                    <RadioGroup
                                        row
                                        defaultValue="Pro"
                                        onChange={(e) => {
                                            dispatch({
                                                type: types.POSITION_CHANGED,
                                                value: e.target.value,
                                            });
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Pro"
                                            control={<Radio />}
                                            label="Pro"
                                        />
                                        <FormControlLabel
                                            value="Con"
                                            control={<Radio />}
                                            label="Con"
                                        />
                                        <FormControlLabel
                                            value="Restrain"
                                            control={<Radio />}
                                            label="Restrain"
                                        />
                                    </RadioGroup>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{ textTransform: "none" }}
                                        onClick={(e) => {
                                            dispatch({
                                                type: types.OPEN_CHANGED,
                                                value: false,
                                            });
                                        }}
                                    >
                                        Vote
                                    </Button>
                                </Box>
                            </Modal>
                        </Box>

                        <Box>
                            <Tabs
                                centered
                                textColor="secondary"
                                indicatorColor="secondary"
                                value={state.view}
                                onChange={(e, newValue) => {
                                    dispatch({
                                        type: types.VIEW_CHANGED,
                                        value: newValue,
                                    });
                                    //setView(newValue);
                                }}
                                aria-label="Resolution tabs"
                            >
                                {views.map((view) => (
                                    <Tab key={view} label={view} value={view} />
                                ))}
                            </Tabs>
                        </Box>
                        {state.view === views[0] && (
                            <Overview resolution={resolution}></Overview>
                        )}
                        {state.view === views[1] && (
                            <ProsCons
                                ual={ual}
                                resolution={resolution}
                            ></ProsCons>
                        )}
                        {state.view === views[2] && (
                            <Statistics resolution={resolution}></Statistics>
                        )}
                        {state.view === views[4] && (
                            <LiveChat
                                ual={ual}
                                resolution={resolution}
                                encryptionKey={encryptionKey}
                            />
                        )}
                    </>
                ) : (
                    <Box> Are you lost ? This is not a valid resolution. </Box>
                )}
            </Container>
        </>
    );
}

export async function getServerSideProps(context) {
    const { pid } = context.query;

    return {
        props: {
            pid: pid,
            encryptionKey: process.env.ENCRYPTION_KEY || "",
        },
    };
}
