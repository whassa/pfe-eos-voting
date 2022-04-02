import Image from "next/image";
import Menu, { drawerWidth } from "../../src/component/Menu/Menu";
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText, Input, TextField, DialogActions, Dialog
} from "@mui/material";
import { useReducer, useEffect } from "react";
import Header from "component/Head/Header";
import LiveChat from "component/Proposals/LiveChat/LiveChat";
import ProsCons from "component/Proposals/ProsCons/ProsCons";
import Overview from "component/Proposals/Overview/Overview";
import Statistics from "component/Proposals/Statistic/Statistic";
import SnackbarAlert from "common/SnackbarAlert/snackbarAlert";
import {
    getProposal,
    vote,
    voteTemplate,
} from "../../src/utils/ContractActions/Contract";
import VoteModal from "component/Proposals/VoteModal/VoteModal";
import News from "component/Proposals/News/News";
import { useRouter } from "next/router";
import Loading from "/src/common/Loading";
import dayjs from "dayjs"

const views = ["Overview", "Pros & Cons", "Statistics", "News", "Live Chat"];

const initialState = {
    view: views[0],
    open: false,
    position: "none",
    resolution: {},
    loading: true,
    snackbarOpen: false,
    submitDisable: false,
    error: "",
    allowEdit: false,
};

const types = {
    VIEW_CHANGED: "TITLE_CHANGED",
    OPEN_CHANGED: "CONTENT_CHANGED",
    POSITION_CHANGED: "POSITION_CHANGED",
    RESOLUTION_CHANGED: "RESOLUTION_CHANGED",
    TITLE_CHANGED: "TITLE_CHANGED",
    SUMMARY_CHANGED: "SUMMARY_CHANGED",
    CONTENT_CHANGED: "CONTENT_CHANGED",
    CATEGORY_CHANGED: "CATEGORY_CHANGED",
    VOTEMARGIN_CHANGED: "VOTEMARGIN_CHANGED",
    RESOLUTION_FETCHED: "RESOLUTION_FETCHED",
    ERROR_FORM_RESPONSE: "ERROR_FORM_RESPONSE"
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.VIEW_CHANGED:
            return { ...state, view: action.value };
        case types.OPEN_CHANGED:
            return { ...state, open: action.value };
        case types.POSITION_CHANGED:
            return { ...state, position: action.value };
        case types.TITLE_CHANGED:
            return { ...state.resolution, title: action.value };
        case types.SUMMARY_CHANGED:
            return { ...state.resolution, summary: action.value };
        case types.CONTENT_CHANGED:
            return { ...state.resolution, content: action.value };
        case types.CATEGORY_CHANGED:
            return { ...state, category: action.value };
        case types.VOTEMARGIN_CHANGED:
            return { ...state.resolution, voteMargin: action.value };
        case types.RESOLUTION_FETCHED:
            return {
                ...state,
                resolution: action.value,
                loading: false,
                open: false,
            };
        case types.RESOLUTION_CHANGED:
            return {
                ...state,
                resolution: action.value,
                loading: false,
                open: false,
            };
        case types.ERROR_FORM_RESPONSE:
            return {
                ...state,
                submitDisable: false,
                error: action.value,
                snackbarOpen: true,
            };
        case types.CLOSE_SNACKBAR:
            return { ...state, open: false };
        case types.USER_VOTED:
            return { ...state };
        default:
            return { ...state };
    }
};

export default function pid({
    ual,
    encryptionKey,
    pid,
    eosAccountName,
}) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const router = useRouter();

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
  
    useEffect( () => {
        getProposal(pid, eosAccountName).then( (value) => {
          dispatch({type: types.RESOLUTION_FETCHED, value: ( value.rows ? value.rows[0] :  {} )});
        }).catch((error) => {
            dispatch({
                value: (error instanceof String ? error : error.toString()),
                type: types.ERROR_FORM_RESPONSE,
            });
        });
    }, []);

    useEffect(() => {
        if (ual.activeUser && state.resolution && state.resolution.votes) {
            const vote = state.resolution.votes.vote.find((vote) => {
                if (ual.activeUser.accountName === vote.user) {
                    return vote;
                }
            });
            dispatch({
                type: types.POSITION_CHANGED,
                value: vote && vote.value,
            });
        }
    }, [ual, state.resolution]);

    const userVoted = () => {
        if (state.position >= -1) {
            const voteInformation = {
                ...voteTemplate,
                proposalID: pid,
                value: state.position,
            }
            vote( ual, voteInformation, eosAccountName).then(() => {
                // Fetch the actual data
                getProposal(pid, eosAccountName).then( (value) => {
                    dispatch({type: types.RESOLUTION_CHANGED, value: ( value.rows ? value.rows[0] :  {} )});
                })
                .catch((error) => {
                    dispatch({
                        value:
                            error instanceof String ? error : error.toString(),
                        type: types.ERROR_FORM_RESPONSE,
                    });
                });
            });
        }
    };

    const votable =
        ual.activeUser &&
        state.resolution &&
        dayjs(state.resolution.expiredAt) >= dayjs() &&
        state.resolution.whitelist &&
        (
            state.resolution.whitelist.length === 0 ||
            state.resolution.author === ual.activeUser.accountName ||
            state.resolution.whitelist.includes(ual.activeUser.accountName)
        )

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
                {state.loading ? (
                    <Loading />
                ) : state.resolution ? (
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
                                    {state.resolution.title}
                                </Typography>
                                <Typography variant="h6" onClick={() => {
                                   router.push("/user/"+state.resolution.author);
                                }}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {state.resolution.author}
                                </Typography>
                            </Box>
                            
                                <>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            marginLeft: "auto",
                                        }}
                                    >
                                        {ual.activeUser && votable && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{ textTransform: "none" }}
                                            onClick={() => {
                                                dispatch({
                                                    type: types.OPEN_CHANGED,
                                                    value: true,
                                                });
                                            }}
                                        >
                                            Vote for this Resolution
                                        </Button>
                                        )}
                                        {(ual.activeUser && ual.activeUser.accountName === state.resolution.author) && (
                                            <Button
                                                sx={{ marginTop: "5px" }}
                                                disabled={
                                                    state.resolution.author !== ual.activeUser.accountName
                                                }
                                                onClick={() => {
                                                   router.push('/proposal?update=true&proposal='+pid)
                                                }}
                                                type="submit"
                                                variant="contained"
                                            >
                                                Edit resolution
                                            </Button>)}
                                    </Box>
                                    <VoteModal
                                        open={state.open}
                                        dispatch={dispatch}
                                        userVoted={userVoted}
                                        state={state}
                                        types={types}
                                        position={state.position}
                                    />
                                </>
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
                                }}
                                aria-label="Resolution tabs"
                            >
                                {views.map((view) => (
                                    <Tab key={view} label={view} value={view} />
                                ))}
                            </Tabs>
                        </Box>
                        {state.view === views[0] && (
                            <Overview resolution={state.resolution}></Overview>
                        )}
                        {state.view === views[1] && (
                            <ProsCons
                                ual={ual}
                                resolution={state.resolution}
                                eosAccountName={eosAccountName}
                                refreshProsCons={() => {
                                    return getProposal(pid, eosAccountName).then( (value) => {
                                        dispatch({type: types.RESOLUTION_FETCHED, value: ( value.rows ? value.rows[0] :  {} )});
                                    }).catch((e) => {
                                        dispatch({
                                            value: (error instanceof String ? error : error.toString()),
                                            type: types.ERROR_FORM_RESPONSE,
                                        });
                                    });
                                }}
                            ></ProsCons>
                        )}
                        {state.view === views[2] && (
                            <Statistics
                                resolution={state.resolution}
                            ></Statistics>
                        )}
                        {state.view === views[3] && (
                            <News
                                ual={ual}
                                news={state.resolution.news.singlenews}
                                resolutionID={pid}
                                resolutionAuthor={state.resolution.author}
                                eosAccountName={eosAccountName}
                                refreshNews={() => {
                                    return getProposal(
                                        pid,
                                        eosAccountName
                                    ).then((value) => {
                                        dispatch({
                                            type: types.RESOLUTION_FETCHED,
                                            value: value.rows
                                                ? value.rows[0]
                                                : {},
                                        });
                                    });
                                }}
                            ></News>
                        )}
                        {state.view === views[4] && (
                            <LiveChat
                                ual={ual}
                                resolution={state.resolution}
                                encryptionKey={encryptionKey}
                            />
                        )}
                    </>
                ) : (
                    <Box> Are you lost ? This is not a valid resolution. </Box>
                )}
                <SnackbarAlert
                    severity={"error"}
                    open={state.snackbarOpen}
                    onClose={() => {
                        dispatch({ type: types.CLOSE_SNACKBAR });
                    }}
                    message={state.error}
                />
            </Container>
        </>
    );
}

export async function getServerSideProps(context) {
    const { pid } = context.query;

    return {
        props: {
            pid: pid,
            // GunJs encryption key
            encryptionKey: process.env.ENCRYPTION_KEY || "",
            eosAccountName: process.env.EOS_ACCOUNT_NAME,
        },
    };
}
