import { Box, CircularProgress, CircularProgressProps, SxProps } from "@mui/material";

interface Props {
    containerProps?: SxProps;
    spinnerProps?: CircularProgressProps
}

export const Spinner = ({containerProps, spinnerProps}: Props) => {
    return (
        <Box
            sx={containerProps}
        >
            <CircularProgress {...spinnerProps} />
        </Box>
    );
};
