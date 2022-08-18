import {  useField } from "formik";
import { Alert, TextField } from "@mui/material";

interface Props {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    [x: string]: any;
}

export const InputCustom = ({ ...props }: Props) => {
    const [field, meta] = useField(props);

    return (
        <>
            <TextField type="text" {...props} {...field}/>
            {meta.touched && meta.error && (
                <Alert severity="error">{meta.error}</Alert>
            )}
        </>
    );
};
