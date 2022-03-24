import { CircularProgress, Box } from "@mui/material";
import React from "react";


const Loading = () => {
 

  return (
    <Box sx={{ position: 'fixed', top: 'calc(45% - 80px)', left: '50%'}}> 
      <CircularProgress  thickness={5} size={80} />
    </Box>
  );
};

export default Loading;
