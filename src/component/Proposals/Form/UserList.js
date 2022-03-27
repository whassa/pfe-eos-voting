import {
    Grid,
    Paper,
    Container,
    Box,
    Stack,
    List,
    ListItem,
    TextField,
    IconButton,
    Typography,
    Alert
} from "@mui/material";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useState } from "react";

export default function UserList({ whiteList, valueArguments }) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    return (
        <Box sx={{ marginBottom: "10px" }}>
            <Stack direction="row">
                <TextField
                    label="Add username to whitelist"
                    variant="outlined"
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    value={text}
                    sx={{ flex: 1 }}
                    required
                />
                <IconButton
                    onClick={() => {
                        if (!whiteList.includes(text)) {
                            valueArguments([...whiteList, text]);
                            setText("");
                            setError("");
                        }else{
                            setError("User already added to the list");
                        }
                    }}
                >
                    <AddCircleOutlineIcon color="primary" />
                </IconButton>
            </Stack>
            { error.length > 0 && (<Alert severity="error" sx={{marginTop: '5px'}}>{error}</Alert>)}
            <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
                {whiteList.map((item, key) => (
                    <ListItem key={key}>
                        <Typography sx={{ marginRight: "auto" }}>
                            {item}
                        </Typography>
                        <IconButton
                            onClick={() => {
                                const tmpArray = [...whiteList];
                                tmpArray.splice(key, 1);
                                valueArguments(tmpArray);
                            }}
                        >
                            <RemoveCircleOutlineIcon color="primary" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
