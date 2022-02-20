export let message;
export let sender;

const messageClass = message.who === sender ? 'sent' : 'received';
const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;
const ts = new Date(message.when);

export default function LiveChatMessage({ ual }) {
    return (
        <Box>
            <p>{message.what}</p>
            <time>{ts.toLocaleTimeString()}</time>
        </Box>
        
    );
}