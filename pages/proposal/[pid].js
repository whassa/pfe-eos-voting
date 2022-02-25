import Image from "next/image";
import Menu, { drawerWidth } from "../../src/component/Menu/Menu";
import { Box, Container, Typography, Tabs, Tab, Button } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";
import { useState } from "react";
import Header from "component/Head/Header";
import { styled } from "@mui/system";
import LiveChat from "../../src/component/Proposals/LiveChat/LiveChat";
import resolutions from "../../src/component/Proposals/mockDataForTest";
import ProsCons from "../../src/component/Proposals/ProsCons/ProsCons";
import Overview from "../../src/component/Proposals/Overview/Overview";
import Statistics from "component/Proposals/Statistic/Statistic";

const views = ["Overview", "Pros & Cons", "Statistics", "News", "Live Chat"];

export default function pid({ ual, encryptionKey, pid }) {
    const [view, setView] = useState(views[0]);

    const resolution = resolutions.find((res) => res.id === pid);

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
                                >
                                    Vote for this Resolution
                                </Button>
                            </Box>
                        </Box>

                        <Box>
                            <Tabs
                                centered
                                textColor="secondary"
                                indicatorColor="secondary"
                                value={view}
                                onChange={(e, newValue) => {
                                    setView(newValue);
                                }}
                                aria-label="Resolution tabs"
                            >
                                {views.map((view) => (
                                    <Tab key={view} label={view} value={view} />
                                ))}
                            </Tabs>
                        </Box>
                        {view === views[0] && (
                            <Overview resolution={resolution}></Overview>
                        )}
                        {view === views[1] && (
                            <ProsCons
                                ual={ual}
                                resolution={resolution}
                            ></ProsCons>
                        )}
                        {view === views[2] && (
                            <Statistics resolution={resolution}></Statistics>
                        )}
                        {view === views[4] && (
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
