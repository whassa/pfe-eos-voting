import {
  Grid,
  Paper,
  Container,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

export default function ListProsCons({ prosAndCons }) {
  return (
    <Grid>
      {prosAndCons &&
        prosAndCons.map((argument) => {
          return <Paper />;
        })}
    </Grid>
  );
}
