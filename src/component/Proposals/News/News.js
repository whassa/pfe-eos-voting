import {Paper, Box, Stack } from "@mui/material";
import { useTheme } from "@mui/styles";
import NewsItem from "./NewsItem";
import FormNews from "./FormNews";

export default function News({
    ual,
    news,
    resolutionID,
    resolutionAuthor,
    eosAccountName,
    refreshNews,
}) {
    const theme = useTheme();
    return (
        <>
            {ual && ual.activeUser &&resolutionAuthor === ual.activeUser.accountName && (
                <Paper elevation={3} padding="dense" sx={{ padding: "10px" }}>
                
                        <Box sx={{ flex: 1 }}>
                            <FormNews
                                ual={ual}
                                resolutionID={resolutionID}
                                eosAccountName={eosAccountName}
                                refreshNews={refreshNews}
                            />
                        </Box>
                
                </Paper>
             )}
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
            >
                {news &&
                    news.map((singleNew) => {
                        return (
                            <NewsItem
                                key={singleNew.createdAt}
                                singleNew={singleNew}
                                ual={ual}
                                eosAccountName={eosAccountName}
                                resolutionAuthor={resolutionAuthor}
                                resolutionId={resolutionID}
                                oldData = {{oldTitle: singleNew.title, oldContent: singleNew.content}}
                                refreshNews = {refreshNews}
                            />
                        );
                    })}
            </Stack>
        </>
    );
}
