import {
    Box,
    Typography,
    Button,
    Modal,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";

export default function VoteModal({ dispatch, userVoted, open, position, types }) {
    return (
        <Modal
            open={open}
            onClose={(e) => {
                dispatch({
                    type: types.OPEN_CHANGED,
                    value: false,
                });
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                >
                    Please make your vote
                </Typography>
                <RadioGroup
                    value={position}
                    onChange={(e) => {
                        dispatch({
                            type: types.POSITION_CHANGED,
                            value: e.target.value,
                        });
                    }}
                    sx={{ marginLeft: '10px', marginBottom: '10px'}}
                >
                    <FormControlLabel
                        value={"1"}
                        control={<Radio />}
                        label="Pro"
                    />
                    <FormControlLabel
                        value={"-1"}
                        control={<Radio />}
                        label="Con"
                    />
                    <FormControlLabel
                        value={"0"}
                        control={<Radio />}
                        label="Restrain"
                    />
                </RadioGroup>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: "none", marginRight: '10px' }}
                    onClick={userVoted}
                >
                    Vote
                </Button>
                <Button
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                        dispatch({
                            type: types.OPEN_CHANGED,
                            value: false,
                        });
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Modal>
    )
}