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
import React, { useCallback, useEffect, useState } from "react";
import restApi from "@/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { randomNum } from "@/components/randomBGI";

export function BoardCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [requestBody, setRequestBody] = useState({
    title: "",
    content: "",
    author: "임시작가",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", "임시");

    if (file) {
      formData.append("image", file);
    }
    try {
      restApi.post("/api/board", requestBody).then((res) => {
        if (res.status === 200) navigate("/board");
      });
    } catch (error) {
      console.log(error);
    }

    //사진까지 넣을때 이런식으로 하는거야
    // try {
    //   const response = await restApi.post("api/board", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log(response.data);
    //   navigate.push("/board");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onChangeContents = useCallback((contents) => {
    setContent(contents);
  }, []);

  console.log(content);

  return (
    <>
      <section className="relative block h-[25vh]">
        <div
          className={
            "absolute top-0 h-full w-full bg-cover bg-center " +
            `bg-[url('/img/background-1.jpg')]`
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
              글쓰기
            </Typography>
          </CardHeader>
          <div className="max-h-30 mx-auto max-w-5xl  rounded-3xl bg-white px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="space-y-4 py-8 sm:py-5">
                <div>
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    글쓰기
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <Input
                      type="text"
                      placeholder="제목을 입력하세요"
                      value={requestBody?.title}
                      onChange={(e) =>
                        setRequestBody((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      required
                      size="md"
                    />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="h-52 sm:col-span-6">
                    <ReactQuill
                      onChange={onChangeContents}
                      style={{ height: "160px" }}
                      placeholder="내용을 입력하세요"
                    />
                  </div>
                </div>

                <div className="mt-6 sm:mt-10 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      사진 첨부
                    </label>
                    <div className="mt-2 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        {file ? (
                          <img src={URL.createObjectURL(file)} alt="user" />
                        ) : (
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        )}
                      </span>
                      <label
                        htmlFor="file-upload"
                        className="relative ml-5 cursor-pointer rounded-md font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>파일 선택</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-5 sm:grid-cols-6">
                  <div className="flex justify-between sm:col-span-6">
                    <Button type="submit" color="blue" size="md">
                      저장
                    </Button>
                    <Link to={"/board"} className="text-right">
                      <Button variant="gradient" type="button">
                        목록으로
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <CardFooter className="text-right">
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
    </>
  );
}
