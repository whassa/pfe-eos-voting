import { Grid, Paper, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/styles";
import ProsConsItem from "./ProsConsItem";

export default function ListProsCons({ ual, prosAndCons }) {
    const theme = useTheme();

    return (
        <Grid sx={{ marginTop: theme.homeMarginTop}}>
            {prosAndCons &&
                prosAndCons.map((argument) => {
                    return (
                      <ProsConsItem key={argument.id} argument={argument} />
                    );
                })}
        </Grid>
    );
}
