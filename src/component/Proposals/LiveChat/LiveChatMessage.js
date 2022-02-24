
import { Box } from "@mui/material";

export default function LiveChatMessage({ ual, message }) {
    return (
        <Box>
            <p><time>{message.when}</time> - {message.who} : {message.what}</p>
        </Box>
    );
}