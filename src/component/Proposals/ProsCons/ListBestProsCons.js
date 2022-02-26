import { Grid, Paper } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useTheme } from "@mui/styles";

export default function ListBestProsCons({ prosList, consList }) {
    const theme = useTheme();

    return (
        <Paper elevation={3} padding="dense" sx={{ marginTop: theme.homeMarginTop}}>
            <Grid>
                Pros
                {prosList &&
                    prosList.map((argument) => {
                        return (
                            <Grid id={argument.id}>
                                {/*TODO changer .content par .title et items.length par .vote*/}
                                {argument.content}{" "}
                                {argument.votes.items.length}{" "}
                                <ArrowCircleUpIcon />
                            </Grid>
                        );
                    })}
            </Grid>
            <Grid>
                Cons
                {consList &&
                    consList.map((argument) => {
                        return (
                            <Grid id={argument.id}>
                                {/*TODO changer .content par .title et items.length par .vote*/}
                                {argument.content}{" "}
                                {argument.votes.items.length}{" "}
                                <ArrowCircleDownIcon />
                            </Grid>
                        );
                    })}
            </Grid>
        </Paper>
    );
}
