
import { useEffect, useState } from "react";
import GUN from "gun/gun";
import SEA from "gun/sea";
import LiveChatMessage from "./LiveChatMessage";

import { Grid, Paper, Container } from "@mui/material";

let messages = [];
const gun =  GUN();
const user = gun.user().recall({sessionStorage: true});

const match = {
  // lexical queries are kind of like a limited RegEx or Glob.
  '.': {
    // property selector
    '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
  },
  '-': 1, // filter in reverse
};


export default function LiveChat({ ual, resolution, encryptionKey }) {

  let [newMessage, setNewMessage] = useState('');
  let [messages, setMessages] = useState([]);
  

  async function sendMessage() {
    const index = new Date().toISOString();
    // new TextDecoder().decode(uin8arry)
    const publicKey = ual.activeUser.session.publicKey.data.array;
    const messageToEncrypt = {
      message:newMessage,
      userName:ual.activeUser.accountName,
      userPublicKey:publicKey
    };
    const secret = await SEA.encrypt(messageToEncrypt, encryptionKey);
    // const message = user.get('all').set({ what: secret });
    gun.get("liveChat:" + resolution.id)
      .put({ [index]: secret});
    console.log('message sent');
    setNewMessage("");
  }

  useEffect( async () => {
  
    gun.get("liveChat:" + resolution.id)
      .map(match)
      .once(async (data, id) => {
        console.log(data);
        if (data) {
          // Key for end-to-end encryption
          const messageDecrypted = (await SEA.decrypt(data, encryptionKey))
          var message = {
            // transform the data
            publicKey: messageDecrypted.userPublicKey,
            who: messageDecrypted.userName,
            what: messageDecrypted.message + '', // force decrypt as text.
            when: id, // get the internal timestamp for the what property.
          };
          if (message.what) {
            setMessages(oldMessages => [...oldMessages, message] );
          }
        }
      })
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", padding: "16px", marginTop: "70px" }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} padding="dense">
          {ual.activeUser ? (
            <Grid>
              <main>
                {messages.map((message) => {
                  console.log(message.when);
                  return (
                    <LiveChatMessage
                      key={message.when}
                      message={message}
                      sender={ual.activeUser.accountName}
                    />
                  );
                })}
              </main>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  type="text"
                  placeholder="Type a message..."
                  onChange={(e) => {setNewMessage(e.target.value)}}
                  value={newMessage}
                />
                <button type="submit" disabled={!newMessage}>
                  Submit
                </button>
              </form>
            </Grid>
          ) : (
            <Grid>
              <main>
                {messages.map((message) => {
                  console.log(message.when);
                  return (
                    <LiveChatMessage
                      key={message.when}
                      message={message}
                      sender={ual.activeUser.accountName}
                    />
                  );
                })}
              </main>
              <Grid>
                You are not connected. Please connect to your EOS/EDEN account
                in order to use the live chat.
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </Grid>
  );
}
