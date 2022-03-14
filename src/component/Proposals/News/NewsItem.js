import {
    Grid,
    Box,
    Paper,
    IconButton,
    Typography,
    Stack,
    Item,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/styles";
import { useState } from "react";

export default function NewsItem({ singleNew }) {
    const theme = useTheme();

    return (
        <Paper elevation={3} padding="dense" sx={{ padding: "10px" }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" display="block">
                        {singleNew.title}
                    </Typography>
                    <Typography
                        display="block"
                        variant="caption"
                        sx={{
                            color: theme.palette.grey[400],
                            marginTop: "-2px",
                        }}
                    >
                        {singleNew.createdAt.split("T")[0]}
                    </Typography>
                    <Typography display="block" sx={{ marginTop: "5px" }}>
                        {singleNew.content}
                    </Typography>
                    <Typography display="block" sx={{ marginTop: "5px" }}>
                        {singleNew.url}
                    </Typography>
                </Box>
            </Stack>

            {/*TODO change for .value===1*/}
        </Paper>
    );
}
