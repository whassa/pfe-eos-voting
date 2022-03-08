import { Grid, Paper, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/styles";
import NewsItem from "./NewsItem";

export default function ListNews({ ual, news }) {
    const theme = useTheme();

    return (
        <Grid sx={{ marginTop: theme.homeMarginTop}}>
            {news &&
                news.map((singleNew) => {
                    return (
                      <NewsItem key={singleNew.createdAt} news={singleNew} />
                    );
                })}
        </Grid>
    );
}