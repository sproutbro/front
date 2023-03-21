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
  Avatar,
} from "@material-tailwind/react";
import React, { useCallback, useEffect, useState } from "react";
import restApi from "@/api";
import moment from "moment/moment";
import {
  BriefcaseIcon,
  BuildingLibraryIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Pagination from "@/components/pagination";
import { randomNum } from "@/components/randomBGI";

export function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit;

  const getPosts = async () => {
    try {
      const response = await restApi.get("api/board");
      console.log(response.data);
      setPosts(response.data.sort((a, b) => b.id - a.id));
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
    console.log(loading, "로딩상태체크");
    getPosts();
    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div>로딩중</div>
      ) : (
        <>
          <section className="relative block h-[25vh]">
            <div
              className={
                "absolute top-0 h-full w-full bg-cover bg-center " +
                `bg-[url('/img/background-${randomNum()}.jpg')]`
              }
            />
            <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
          </section>
          <section className="relative bg-blue-gray-50/50 py-16 px-4">
            <div className="container mx-auto">
              <CardHeader
                variant="gradient"
                color="blue"
                className="relative mb-4 -mt-28 mb-6 -ml-0 flex grid h-20 w-full min-w-0 flex-col place-items-center break-words rounded-3xl bg-white  shadow-xl"
              >
                <Typography variant="h3" color="white">
                  자유게시판
                </Typography>
              </CardHeader>
              <div className="rounded-3xl bg-white p-12">
                <div className="overflow-x-autom relative">
                  <table className="mb-6  w-full text-left  text-xs text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-2 py-3">
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
                        posts.slice(offset, offset + limit).map((post) => (
                          <tr
                            className=" border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                            key={post.id}
                          >
                            <th className="px-2 py-3">{post.id}</th>

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
                  <div className="text-right">
                    <Link to={"/board/edit"}>
                      <Button variant="gradient">게시글 작성</Button>
                    </Link>
                  </div>
                  <Pagination
                    total={posts.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
