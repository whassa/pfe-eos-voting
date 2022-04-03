import Box from "@mui/material/Box";
import FormProsCons from "./FormProsCons";
import ListBestProsCons from "./ListBestProsCons";
import ListProsCons from "./ListProsCons";

export default function Menu({ ual, resolution, eosAccountName, refreshProsCons, canCreateVoteArgument = false }) {
    // list
    let prosList = [];
    let consList = [];
    resolution &&
        resolution.arguments &&
        resolution.arguments.argument &&
        resolution.arguments.argument.map((argument) => {
            if (argument.value == true) {
                prosList.push(argument);
            } else if(argument.value == false){
                consList.push(argument);
            }
        });

    prosList.sort((a, b) => b.vote - a.vote);
    consList.sort((a, b) => b.vote - a.vote);
    
    // pros and cons
    return (
        <Box>
            <ListBestProsCons prosList={prosList.slice(0, 5)} consList={consList.slice(0, 5)} />
            { canCreateVoteArgument && (<FormProsCons ual={ual} resolution={resolution} eosAccountName={eosAccountName} refreshProsCons={refreshProsCons} />)}
            { resolution.arguments && <ListProsCons pid={resolution.primaryKey} ual={ual} eosAccountName={eosAccountName} prosAndCons={resolution.arguments.argument} refreshProsCons={refreshProsCons} canVote={!canCreateVoteArgument} />}
        </Box>
    );
}
