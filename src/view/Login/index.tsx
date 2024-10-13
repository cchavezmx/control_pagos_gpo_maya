import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { login } from "../../services/mutations";
import { useState } from "react";
import { LinearProgress } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: "10vh",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn() {
  const [errorLogin, setErrorLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    login({
      email: data.get("email") as string,
      password: data.get("password") as string,
    }).then((response) => {
      if (response?.login) {
        setErrorLogin(false);
      } else {
        setErrorLogin(true);
      }
      setLoading(false);
    });
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          {loading && <LinearProgress />}
          <Typography
            component="h1"
            variant="h2"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Bienvenido
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <Stack gap={1}>
                <FormLabel htmlFor="email">
                  <small>Email</small>
                </FormLabel>
                <TextField
                  error={errorLogin}
                  helperText={errorLogin ? "Invalid email or password." : ""}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={errorLogin ? "error" : "primary"}
                  sx={{ ariaLabel: "email" }}
                  disabled={loading}
                />
                <FormLabel htmlFor="password">
                  <small>Contraseña</small>
                </FormLabel>
                <TextField
                  error={errorLogin}
                  helperText={errorLogin ? "Invalid email or password." : ""}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={errorLogin ? "error" : "primary"}
                  sx={{ ariaLabel: "password" }}
                  disabled={loading}
                />
              </Stack>
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Entrar
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
