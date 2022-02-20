import { username, user } from "./../../userDB";
import { useEffect, useState } from "react";
import GUN from "gun/gun";
import LiveChatMessage from "./LiveChatMessage";

import { Grid, Paper, Container } from "@mui/material";

const db = GUN();
let messages = [];

export default function LiveChat({ ual, resolution, encryptionKey }) {

  let [newMessage, setNewMessage] = useState('');

  async function sendMessage() {
    const secret = await SEA.encrypt(newMessage, encryptionKey);
    const message = user.get("all").set({ what: secret });
    const index = new Date().toISOString();
    db.get("liveChat:" + resolution.id)
      .get(index)
      .put(message);
    console.log('message sent');
    setNewMessage("");
  }
  


  useEffect(() => {
    var match = {
      // lexical queries are kind of like a limited RegEx or Glob.
      ".": {
        // property selector
        ">": new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      "-": 1, // filter in reverse
    };
    // Get Messages
    console.log(db);
    db.get("liveChat:" + resolution.id)
      .map().on((item, id) => {
        console.log(item);
      })
     
  }, [db]);

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
                  return (
                    <LiveChatMessage
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
                  return (
                    <LiveChatMessage
                      message={message}
                      sender={ual.activeUser.accountName}
                    />
                  );
                })}
              </main>
              <Grid>
                You are not connected. Please connect to your EOS/EDAN account
                in order to use the live chat.
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </Grid>
  );
}
