import Box from "@mui/material/Box";
import FormProsCons from "./FormProsCons";
import ListBestProsCons from "./ListBestProsCons";
import ListProsCons from "./ListProsCons";

export default function Menu({ ual, resolution }) {
    // list
    let prosList = [];
    let consList = [];

    resolution &&
        resolution.arguments &&
        resolution.arguments.items &&
        resolution.arguments.items.map((argument) => {
            if (argument.position === "Pro" || argument.pro == true) {
                prosList.push(argument);
            } else {
                consList.push(argument);
            }
        });

    prosList.sort((a, b) => b.vote - a.vote);
    consList.sort((a, b) => b.vote - a.vote);

    console.log(resolution);
    console.log(prosList);
    // pros and cons
    return (
        <Box>
            <ListBestProsCons
                prosList={prosList.slice(0, 5)}
                consList={consList.slice(0, 5)}
            ></ListBestProsCons>
            <FormProsCons ual={ual} resolution={resolution}></FormProsCons>
            <ListProsCons ual={ual} prosAndCons={resolution.arguments.items}></ListProsCons>
        </Box>
    );
}
