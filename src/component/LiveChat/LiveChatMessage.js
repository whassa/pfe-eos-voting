
import { Box } from "@mui/material";

export default function LiveChatMessage({ ual, message }) {
    return (
        <Box>
            <p>{message.what}</p>
            <time>{message.when}</time>
        </Box>
    );
}