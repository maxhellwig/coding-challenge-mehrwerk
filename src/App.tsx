import { Route, Routes } from "react-router-dom";
import { useAuthenticateMutation } from "./app/services/shopApi.ts";
import { useEffect } from "react";
import { ShopList } from "./components/shop/ShopList.tsx";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { ShopDetail } from "./components/shop/ShopDetail.tsx";
import { AuthRequestCredentials } from "./types";
import { demo_credentials } from "./credentials.ts";

export function Home() {
  return (
    <>
      <ShopList></ShopList>
    </>
  );
}

function App() {
  let authCredentials: AuthRequestCredentials = {
    client_id: demo_credentials.client_id,
    client_secret: demo_credentials.client_secret,
    grant_type: demo_credentials.grant_type,
  };

  const [authenticate, { isLoading, isError, isUninitialized }] =
    useAuthenticateMutation();
  useEffect(() => {
    authenticate(authCredentials);
  }, []);

  if (isUninitialized) return <p>Initializing...</p>;

  if (isLoading)
    return (
      <>
        <p>Authenticating...</p>
        <Spinner></Spinner>
      </>
    );
  if (isError)
    return (
      <Alert status="error" m={6}>
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An error occurred while authenticating
        </AlertDescription>
        <Button onClick={() => authenticate(authCredentials)}>
          Login again
        </Button>
      </Alert>
    );

  return (
    <>
      <Heading as="h1" size="4xl">
        Hallo Coding-challenge
      </Heading>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={"/shop/:id"} element={<ShopDetail />} />
      </Routes>
    </>
  );
}

export default App;
