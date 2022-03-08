import Box from "@mui/material/Box";
import FormProsCons from "./FormProsCons";
import ListBestProsCons from "./ListBestProsCons";
import ListProsCons from "./ListProsCons";

export default function Menu({ ual, resolution, privateKey, eosAccountName, refreshProsCons }) {
    // list
    let prosList = [];
    let consList = [];
    console.log(refreshProsCons);
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
            <FormProsCons ual={ual} resolution={resolution} privateKey={privateKey} eosAccountName={eosAccountName} refreshProsCons={refreshProsCons} />
            { resolution.arguments && <ListProsCons ual={ual} prosAndCons={resolution.arguments.argument} />}
        </Box>
    );
}
