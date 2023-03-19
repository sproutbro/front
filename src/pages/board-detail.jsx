import { useParams, Link } from "react-router-dom";
import restApi from "@/api";
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
import React, { useEffect, useState } from "react";

export function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    restApi.get(`/api/board/${id}`).then((response) => {
      setBoard(response.data);
    });
  }, [id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4  w-full max-w-[72rem] -translate-y-2/4 -translate-x-2/4 items-center">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 -mt-10 grid h-28 w-3/5 place-items-center"
          >
            <Typography variant="h3" color="white">
              게시글 목록
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div>
              <h1>{board.title}</h1>
              <p>{board.content}</p>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Link to={"/board"}>
              <Button variant="gradient" fullWidth>
                목록으로
              </Button>
            </Link>
            <Typography variant="small" className="mt-6 flex justify-center">
              이미 계정이 있으신가요?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  로그인
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white"></div>
    </>
  );
}

export default BoardDetail;
