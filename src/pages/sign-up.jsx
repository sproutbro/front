import { Link } from "react-router-dom";
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
import React, { useCallback, useState } from "react";
import restApi from "@/api";

export function SignUp() {
  //회원가입 기본요소
  const [requestBody, setRequestBody] = useState({
    userName: null,
    email: null,
    password: null,
  });

  //오류메시지 상태저장
  const [userNameMessage, setuserNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // 유효성 검사
  const [isuserName, setIsuserName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);

  //회원가입 버튼 눌렀을때
  const handleSignUp = async () => {
    try {
      const response = await restApi.post("/api/auth/register", requestBody);
      console.log(response);
    } catch (error) {
      console.log("회원가입 error:::", error);
    }
  };

  // 이름유효성
  const onChangeName = useCallback((e) => {
    setRequestBody((prev) => ({ ...prev, userName: e.target.value }));
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setuserNameMessage("2글자 이상 10글자 이하로 입력해주세요.");
      setIsuserName(false);
    } else {
      setuserNameMessage("올바른 이름 형식입니다 :)");
      setIsuserName(true);
    }
  }, []);

  // 이메일유효성
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setRequestBody((prev) => ({ ...prev, email: e.target.value }));

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  }, []);

  // 비밀번호유효성
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    ("^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$");

    const passwordCurrent = e.target.value;
    setRequestBody((prev) => ({ ...prev, password: e.target.value }));

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 ~ 15자리로 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }, []);

  //아이디 중복검사

  const handleNameCheck = async () => {
    try {
      const response = await restApi.post(
        "/api/auth/check-duplicate-id",
        requestBody?.userName
      );
      setNameCheck(true);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setNameCheck(false);
  }, [requestBody.userName]);
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
              회원가입
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div>
              <Input
                variant="standard"
                label="닉네임"
                size="lg"
                error={requestBody?.userName?.length > 0 && !isuserName && true}
                onChange={(e) => {
                  onChangeName(e);
                }}
              />

              {!isuserName && requestBody?.userName ? (
                <span className="text-sm text-red-400">{userNameMessage}</span>
              ) : nameCheck && requestBody?.userName ? (
                <span className="text-sm text-blue-400">
                  사용가능한 아이디 입니다
                </span>
              ) : (
                <Button className="mt-1" size="sm" onClick={handleNameCheck}>
                  아이디 중복확인
                </Button>
              )}
            </div>

            <div>
              <Input
                variant="standard"
                type="Password"
                label="비밀번호"
                error={requestBody?.password?.length > 0 && !isPassword && true}
                size="lg"
                onChange={(e) => {
                  onChangePassword(e);
                }}
              />
              {!isPassword && requestBody?.password?.length > 0 && (
                <span className="text-sm text-red-400">{passwordMessage}</span>
              )}
            </div>

            <div>
              <Input
                variant="standard"
                type="e-mail"
                label="Email"
                error={requestBody?.email?.length > 0 && !isEmail && true}
                size="lg"
                onChange={(e) => {
                  onChangeEmail(e);
                }}
              />
              {!isEmail && requestBody?.email?.length > 0 && (
                <span className="text-sm text-red-400">{emailMessage}</span>
              )}
            </div>
            <div className="-ml-2.5">
              <Checkbox label="약관에 동의합니다." />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              onClick={handleSignUp}
              disabled={
                (!isuserName || !isPassword || !isEmail || !nameCheck) && true
              }
            >
              가입하기
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
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

export default SignUp;
