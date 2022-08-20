import * as Yup from 'yup';
import { Form, Formik } from "formik";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

import { InputCustom } from "../layout";

export const ConfirmUser = () => {

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            bgcolor="primary.light"
        >
            <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                    component="img"
                    height="250"
                    image="/sign-g4a043953a_1280.png"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="themeText"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        Lo sentimos, debe cambiar la contraseña para poder
                        acceder.
                    </Typography>
                    <Formik
                        initialValues={{
                            password: "",
                            newPassword: "",
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                        validationSchema={Yup.object({
                            password: Yup.string()
                                .required("La contraseña es obligatoria"),
                            newPassword: Yup.string()
                                .required("La nueva contraseña es obligatoria")
                                .min(6, "Debe contener al menos 6 caracteres.")
                        })}
                    >
                        {(formik) => (
                            <Form>
                                <InputCustom
                                    label="Contraseña actual"
                                    name="password"
                                    margin="dense"
                                    fullWidth
                                    color="secondary"
                                    type="password"
                                />
                                <InputCustom
                                    label="Nueva contraseña"
                                    name="newPassword"
                                    margin="dense"
                                    fullWidth
                                    color="secondary"
                                    type="password"
                                />
                                <Button variant="contained" type="submit" color="secondary" sx={{
                                    display: "block",
                                    margin: "auto",
                                    marginTop: "8px"
                                }}>
                                    Cambiar contraseña
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Box>
    );
};
