import { Grid, Paper, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/styles";
import ProsConsItem from "./ProsConsItem";

export default function ListProsCons({ ual, pid, prosAndCons, eosAccountName, refreshProsCons}) {
    const theme = useTheme();

    prosAndCons.sort(function (a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return (
        <Grid sx={{ marginTop: theme.homeMarginTop }}>
            {prosAndCons &&
                prosAndCons.map((argument) => {
                    return (
                        <ProsConsItem
                            pid={pid}
                            ual={ual}
                            eosAccountName={eosAccountName}
                            refreshProsCons={refreshProsCons}
                            key={argument.createdAt}
                            argument={argument}
                        />
                    );
                })}
        </Grid>
    );
}
