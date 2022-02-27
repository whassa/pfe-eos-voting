import { useEffect, useState } from "react";
import GUN from "gun/gun";
import SEA from "gun/sea";
import LiveChatMessage from "./LiveChatMessage";

import { Grid, Paper, FormControl, Box, Input, Button } from "@mui/material";

const gun = GUN();

const match = {
  // lexical queries are kind of like a limited RegEx or Glob.
  ".": {
    // property selector
    ">": new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
  },
  "-": 1, // filter in reverse
};

export default function LiveChat({ ual, resolution, encryptionKey }) {
  let [newMessage, setNewMessage] = useState("");
  let [messages, setMessages] = useState([]);

  async function sendMessage() {
    const index = new Date().toISOString();
    // new TextDecoder().decode(uin8arry)
    const publicKey = ual.activeUser.session.publicKey.data.array;
    const messageToEncrypt = {
      message: newMessage,
      userName: ual.activeUser.accountName,
      userPublicKey: publicKey,
    };
    const secret = await SEA.encrypt(messageToEncrypt, encryptionKey);
    // const message = user.get('all').set({ what: secret });
    gun.get("liveChat:" + resolution.id).put({ [index]: secret });
    setNewMessage("");
  }

  useEffect(async () => {
    gun
      .get("liveChat:" + resolution.id)
      .map(match)
      .once(async (data, id) => {
        if (data) {
          // Key for end-to-end encryption
          const messageDecrypted = await SEA.decrypt(data, encryptionKey);
          var message = {
            // transform the data
            publicKey: messageDecrypted.userPublicKey,
            who: messageDecrypted.userName,
            what: messageDecrypted.message + "", // force decrypt as text.
            when: id, // get the internal timestamp for the what property.
          };
          if (message.what) {
            setMessages((oldMessages) => [...oldMessages, message]);
          }
        }
      });
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ marginTop: "20px" }}
    >
      <Paper
        elevation={3}
        padding="dense"
        sx={{
          height: "600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{overflowY: 'scroll', margin: '10px', height: '100%' }}>




          {messages.map((message) => {
            return (
              <LiveChatMessage
                ual={ual}
                key={message.when}
                message={message}
              />
            );
          })}
        </Box>
        {ual.activeUser ? (
          <FormControl
            sx={{ margin: '10px', display: 'flex', flexDirection: 'row'}}
          >
            <Input
              type="text"
              placeholder="Type a message..."
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              value={newMessage}
              sx={{width: '100%', marginRight: '5px'}}
            />
            <Button  onClick={(e) => {
              e.preventDefault();
              sendMessage();
            }} type="submit" variant="contained" >
              Submit
            </Button>
          </FormControl>
        ) : (
          <Box sx={{ margin: '10px', display: 'flex', flexDirection: 'row'}}>
            You are not connected. Please connect to your EOS/EDEN account in
            order to use the live chat.
          </Box>
        )}
      </Paper>
    </Grid>
  );
}