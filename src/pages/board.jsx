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
import moment from "moment/moment";

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

  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
  //     setPosts(response.data);
  //   });
  // }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <div>로딩중</div>
      ) : (
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
              <div className="overflow-x-autom relative mb-10 mt-10 max-h-96">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        번호
                      </th>
                      <th scope="col" className="px-16 py-3">
                        제목
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        작성자
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        날짜
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        조회수
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length > 0 &&
                      posts.map((post) => (
                        <tr
                          className="border-b bg-white dark:border-gray-700 dark:bg-gray-800 "
                          key={post.id}
                        >
                          <th className="px-6 py-4 text-center">{post.id}</th>

                          <th
                            scope="row"
                            className="whitespace-nowrap  py-4 font-medium text-gray-900 hover:text-gray-500 dark:text-white"
                          >
                            <Link to={`/board/${post.id}`}>{post.title}</Link>
                          </th>

                          <th className=" px-6 py-4 text-center">
                            {post.author}
                          </th>
                          <th className="px-6 py-4 text-center">
                            {moment(post.createdAt).format("YY.MM.DD")}
                          </th>

                          <th className="px-6 py-4 text-center">
                            {post.views}
                          </th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <CardFooter className="pt-0">
                <Link to={"/board/edit"}>
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
          </div>
        </>
      )}
    </>
  );
}
