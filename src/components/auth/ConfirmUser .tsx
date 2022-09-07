import * as Yup from 'yup';
import { Form, Formik } from "formik";
import { useMutation } from '@apollo/client';
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

import { AlertCustom, InputCustom } from "../layout";
import { useAlert } from '../../hooks/useAlert';
import { AUTHENTICATED, AuthenticatedInput, cache, RENEW, UserResponse } from '../../gql';

export const ConfirmUser = () => {
    const cacheUser = cache.readQuery<{ userRenew: UserResponse | null }>({ query: RENEW });
    const { infoAlert, setInfoAlert } = useAlert();
    const [authenticatedGql, { error }] = useMutation<{ authenticated:UserResponse }, { input: AuthenticatedInput }>( AUTHENTICATED, {
        context: {
            headers: {
                "x-token": localStorage.getItem("token") || "",
            },
        },
        onCompleted({authenticated}) {
            const { token } = authenticated;
            localStorage.setItem('token', token);
        },
        onError(error) {
            setInfoAlert({ openStatus: true, status: "error", message: error.message });
        },
        update(cache, { data }){
            cache.writeQuery({
                query: RENEW,
                data: {
                    userRenew: data?.authenticated
                }
            })
        }
    } );

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
            {error && <AlertCustom infoAlert={infoAlert}/>}
            <Card sx={{ maxWidth: 500 }}>
                <CardMedia
                    component="img"
                    height="250"
                    image="/sign-g4a043953a_1280.png"
                    alt="Sorry image"
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
                        onSubmit={({password, newPassword}) => {
                            authenticatedGql({
                                variables: {
                                    input: {
                                        username: cacheUser?.userRenew?.username!,
                                        password,
                                        newPassword
                                    }
                                }
                            })
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
