
export default function ListProsCons({ prosAndCons }) {
  
    return (
      <Grid>
        { prosAndCons && prosAndCons.map((argument) => {
            return (
                <Paper />
            )
        }) }
        
      </Grid>
    );
  }
  