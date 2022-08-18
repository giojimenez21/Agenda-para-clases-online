import * as Yup from 'yup';
import { Card, CardContent, Grid, Button, Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { InputCustom } from "../layout";


export const Login = () => {
    return (
        <div className="bg-login">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <Grid item xs={12} sm={8} md={4} lg={3}>
                    <Card>
                        <CardContent>
                            <Formik
                                initialValues={{
                                    username: "",
                                    password: "",
                                }}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                                validationSchema={Yup.object({
                                    username: Yup.string()
                                        .required("Debe ingresar el usuario"),
                                    password: Yup.string()
                                        .required("Debe ingresar la contraseña")
                                })}
                            >
                                {(formik) => (
                                    <Form noValidate>
                                        <Typography variant='h4' align='center' marginBottom={3} color="primary" fontWeight={"bold"}>
                                            Iniciar Sesión
                                        </Typography>
                                        <InputCustom
                                            label="Usuario"
                                            name="username"
                                            margin="normal"
                                            fullWidth
                                            autoComplete="off"
                                            color="secondary"
                                        />
                                        <InputCustom
                                            label="Contraseña"
                                            name="password"
                                            margin="normal"
                                            fullWidth
                                            type="password"
                                            color="secondary"
                                        />
                                        <Box textAlign="center">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color='primary'
                                            >
                                                Entrar
                                            </Button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
