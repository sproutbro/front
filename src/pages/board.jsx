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
import React, { useCallback, useEffect, useState } from "react";
import restApi from "@/api";

export function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await restApi.get("api/board");
      console.log(response.data);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.log("getPosts error::", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <div>로딩중</div>
      ) : (
        <>
          {" "}
          <img
            src="/img/background-2.jpg"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
          <div className="container mx-auto p-4">
            <Card className="absolute top-2/4 left-2/4 w-full max-w-[48rem] -translate-y-2/4 -translate-x-2/4 items-center">
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
                {posts.length > 0 &&
                  posts.map((post) => (
                    <div key={post.id} className="border p-4">
                      <div>{post.author}</div>
                      <h3 className="text-lg font-bold">{post.title}</h3>
                      <p className="mt-2">{post.content}</p>
                    </div>
                  ))}
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={"/boards/detail"}>
                  <Button variant="gradient" fullWidth>
                    게시글 작성
                  </Button>
                </Link>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
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
          <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
            {/* <SimpleFooter brandName={"test"} /> */}
          </div>{" "}
        </>
      )}
    </>
  );
}
