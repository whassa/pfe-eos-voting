import { Grid, Paper } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function ListBestProsCons({ prosList, consList }) {
    console.log(prosList);
    return (
        <Grid>
            <Paper elevation={3} padding="dense">
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
        </Grid>
    );
}
