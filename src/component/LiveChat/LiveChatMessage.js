import { Box, Typography } from "@mui/material";

export default function LiveChatMessage({ ual, message }) {
  const date = new Date(message.when);

  const ownMessage = ( ual.activeUser && JSON.stringify(message.publicKey) === JSON.stringify(ual.activeUser.session.publicKey.data.array) );
  console.log(ownMessage);

  return (
    <Box sx={{ 
        display: "flex",
        flexDirection: "column",
        marginBottom: '10px',
    }}>
      <Typography component="span" variant="caption" sx={{ 
          display: 'inline-block',
          marginBottom: "5px",
          color: '#BDBDBD',
          ...(ownMessage) && {
            float: "right",
            direction: 'rtl',
          }
        }}>
        {message.who} on {date &&
          `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      </Typography>
      <Box>
        <Typography
          component="div"
          sx={{
            margin: "5px",
            marginLeft: '0px',
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
            display: 'inline-block',
            ...(ownMessage) && {
                color: 'white',
                backgroundColor: '#324856',
                float: "right"
            }
          }}
        >
          {message.what}
        </Typography>
      </Box>
    </Box>
  );
}
