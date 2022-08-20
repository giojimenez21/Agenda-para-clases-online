import { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { TransitionProps } from "@mui/material/transitions";
import { AlertCustomProps } from "./layout.interface";
import { Alert, Grow } from "@mui/material";

interface Props {
    infoAlert: AlertCustomProps
}
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Grow ref={ref} {...props}/>;
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
