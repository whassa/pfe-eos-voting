import { Grid, Paper, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/styles";
import NewsItem from "./NewsItem";
import FormNews from "./FormNews";

export default function News({
    ual,
    news,
    resolutionID,
    resolutionAuthor,
    privateKey,
    eosAccountName,
    refreshNews,
}) {
    const theme = useTheme();

    return (
        <Paper elevation={3} padding="dense" sx={{ padding: "10px" }}>
            {resolutionAuthor.userName === ual.activeUser.accountName && (
                <Box sx={{ flex: 1 }}>
                    <FormNews
                        ual={ual}
                        resolutionID={resolutionID}
                        privateKey={privateKey}
                        eosAccountName={eosAccountName}
                        refreshNews={refreshNews}
                    />
                </Box>
            )}
            <Grid sx={{ marginTop: theme.homeMarginTop }}>
                {news &&
                    news.map((singleNew) => {
                        return (
                            <NewsItem
                                key={singleNew.createdAt}
                                news={singleNew}
                            />
                        );
                    })}
            </Grid>
        </Paper>
    );
}
