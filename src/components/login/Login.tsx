import { Card, CardContent, Grid, TextField, Button, Box } from "@mui/material";

export const Login = () => {
    return (
        <div className="bg-login">
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <Grid item xs={12 } sm={8} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <TextField label="Usuario" fullWidth margin="normal"/>
                            <TextField label="Contraseña" fullWidth margin="normal"/>
                            <Box textAlign="center">
                                <Button variant="contained" color="primary" className="">
                                    Entrar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};
