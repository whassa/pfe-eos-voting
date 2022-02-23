import { Grid, Paper, Container, Label } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

export default function newProposalForm(){
    let title;
    let summary;
    let content;
    let category;

    function sendForm(){
        //TODO create JSON object and send it to the contract
        let formInformations = {
            id:uuidv4(),
            title:title,
            summary:summary,
            content:content,
            category:category,
            createdAt:new Date().toISOString(),
            updatedAt:new Date().toISOString(),
            deletedAt:null,
            author:{
                name:ual.activeUser.userName,
                userPublicKey:ual.activeUser.session.publicKey.data.array
            },
            status:"Open",
            arguments:{
                items:[]
            },
            news:{
                items:[]
            },
            vote:{
                vote:0, //votes by the user. I.E, -1 because positif vote - negatif vote = -1
                totalVote:0, //how many people voted
                items:[] //all the votes. When each vote was created and if it is a positif or negatif vote
            }
        }
    }

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
                    <form 
                        onSubmit={(e) =>{
                            e.preventDefault();
                            sendForm();
                        }}
                    >
                        <Label>Title</Label>
                        <input
                            type="text"
                            placeholder="Enter title..."
                            //onChange={(e) => {setNewMessage(e.target.value)}}
                            value={title}
                            required
                        />
                        
                        <Label>Summary</Label>
                        <textarea 
                            placeholder="Type the summary..."
                            //onChange={(e) => {setNewMessage(e.target.value)}}
                            value={summary}
                            required
                        />
                        
                        <Label>Content</Label>
                        <textarea 
                            placeholder="Type the content..."
                            //onChange={(e) => {setNewMessage(e.target.value)}}
                            value={content}
                            required
                        />
                        
                        <Label>Category</Label>
                        <input
                            type="text"
                            placeholder="Enter category..."
                            //onChange={(e) => {setNewMessage(e.target.value)}}
                            value={category}
                        />

                        <button type="submit">Create</button>
                    </form>
                </Paper>
            </Container>
        </Grid>
    );

}