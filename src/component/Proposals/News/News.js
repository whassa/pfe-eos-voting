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
            <Paper elevation={3} padding="dense" sx={{ padding: "10px" }}>
                {ual && resolutionAuthor === ual.activeUser.accountName && (
                    <Box sx={{ flex: 1 }}>
                        <FormNews
                            ual={ual}
                            resolutionID={resolutionID}
                            eosAccountName={eosAccountName}
                            refreshNews={refreshNews}
                        />
                    </Box>
                )}
            </Paper>
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
