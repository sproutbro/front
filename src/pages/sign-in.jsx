import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import restApi from "@/api";
import React, { useCallback, useState } from "react";

export function SignIn() {
  const navigate = useNavigate();
  const [requestBody, setRequestBody] = useState({
    username: null,
    password: null,
  });

  const handleSignIn = useCallback(async () => {
    try {
      const response = await restApi.post("/api/auth/login", requestBody);
      const token = response.headers.get("Authorization").split(" ")[1];
      localStorage.setItem("access_token", token);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }, [requestBody]);

  const handleUsernameChange = (e) => {
    setRequestBody((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setRequestBody((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              로그인
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <Input
              variant="standard"
              label="닉네임"
              size="lg"
              onChange={handleUsernameChange}
            />
            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              onChange={handlePasswordChange}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignIn}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignIn;
