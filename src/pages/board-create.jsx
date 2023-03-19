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
      restApi.post("/api/board", requestBody);
      navigate("/board");
    } catch (error) {
      console.log(error);
    }

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

  return (
    <>
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
                게시글 쓰기
              </Typography>
            </CardHeader>

            <div className="max-h-30 mx-auto max-w-5xl  px-4 sm:px-6 ">
              <form
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
              >
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
                        size="regular"
                        outline={false}
                      />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <textarea
                        id="content"
                        name="content"
                        rows="10"
                        value={requestBody.content}
                        onChange={(e) =>
                          setRequestBody((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        placeholder="내용을 입력하세요"
                      />
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-5 sm:grid-cols-6">
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
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
                    <div className="sm:col-span-6">
                      <Button type="submit" color="blue" size="lg">
                        저장
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

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
        <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
          {/* <SimpleFooter brandName={"test"} /> */}
        </div>
      </>
    </>
  );
}
