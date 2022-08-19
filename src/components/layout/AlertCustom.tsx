import { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { AlertCustomProps } from "./layout.interface";
import { Alert } from "@mui/material";

interface Props {
    infoAlert: AlertCustomProps
}
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertCustom = ({ infoAlert }: Props) => {
    const {openStatus, status, message} = infoAlert;
    const [open, setOpen] = useState(openStatus);

    const handleClose = () => {
        setOpen(!open);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <Alert severity={status}>
                {message}
            </Alert>
        </Dialog>
    );
};
