import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Alert } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import {clearError} from "../context/UserStore"


const EventBox = () => {

    const { error } = useSelector(state => state.user)
    const [open, setOpen] = React.useState(error ? true : false);
    const dispatch = useDispatch()

    const handleRefresh = () => {
        window.location.reload(false);
    }

    const handleClose = () => {
        dispatch(clearError())
        setOpen(false);
    }
    return (
        <Grid>
            <Dialog open={open}
                onClose={handleClose}
            >
                <DialogTitle id="error">
                    {"We've encoutered an Error"}
                </DialogTitle>
                <DialogContent>

                    <Alert variant="outlined" severity="error">{error}</Alert>
                    <DialogActions>
                        <Button onClick={handleRefresh}> Refresh</Button>
                        <Button onClick={handleClose} autoFocus>Close</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Grid>
    )
}

export default EventBox