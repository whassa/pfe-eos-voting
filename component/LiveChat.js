import { username, user } from './../src/userDB';
import { useEffect } from 'react'
import GUN from 'gun';
import LiveChatMessage from './LiveChatMessage';
import { Grid } from '@mui/material';

const db = GUN();
let newMessage;
let messages = [];
export let porposalID;

useEffect(() => {
    var match = {
        // lexical queries are kind of like a limited RegEx or Glob.
        '.': {
          // property selector
          '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
        },
        '-': 1, // filter in reverse
      };
      // Get Messages
      db.get('chat')
        .map(match)
        .once(async (data, id) => {
          if (data) {
            // Key for end-to-end encryption
            const key = '#foo';
            var message = {
              // transform the data
              who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
              what: (await SEA.decrypt(data.what, key)) + '', // force decrypt as text.
              when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
            };
            if (message.what) {
              messages = [...messages.slice(-100), message].sort((a, b) => a.when - b.when);
              if (canAutoScroll) {
                autoScroll();
              } else {
                unreadMessages = true;
              }
            }
          }
        });    
})

async function sendMessage() {
    const secret = await SEA.encrypt(newMessage, '#foo');
    const message = user.get('all').set({ what: secret });
    const index = new Date().toISOString();
    db.get('liveChat'+porposalID).get(index).put(message);
    newMessage = '';
}

export default function LiveChat({ ual }) {
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", padding: '16px', marginTop: '70px' }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} padding="dense">
                    {ual.activeUser ? (
                        <Grid>
                            <main>
                                {messages.map(message =>{
                                    return(
                                        <LiveChatMessage message={message} sender={ual.activeUser.accountName}/>
                                    )}
                                    )
                                }
                            </main>
                            <form on:submit={sendMessage} on:preventDefaul={sendMessage}>
                                <input type="text" placeholder="Type a message..." bind:value={newMessage}/>
                                <button type="submit" disabled={!newMessage}>💥</button>
                            </form>
                        </Grid>
                    ) : (
                      <Grid>
                        <main>
                            {messages.map(message =>{
                                return(
                                    <LiveChatMessage message={message} sender={ual.activeUser.accountName}/>
                                )}
                                )
                            }
                        </main>
                        <Grid>
                          You are not connected. Please connect to your EOS/EDAN account in order to use the live chat.
                        </Grid>
                      </Grid>
                        
                    )}
                </Paper>
            </Container>
        </Grid>
        
    );
}