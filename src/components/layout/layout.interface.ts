import { AlertColor } from "@mui/material";

export interface AlertCustomProps {
    openStatus: boolean;
    status?: AlertColor;
    message?: string;
}