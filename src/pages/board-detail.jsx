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
import { randomNum } from "@/components/randomBGI";

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
          <div className="rounded-3xl bg-black bg-white p-12">
            <div className="overflow-x-autom relative">
              <div className="mx-auto mb-6 max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-medium text-gray-900">
                      {board.title && board.title}
                    </h2>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                        게시글
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="relative mx-auto max-w-screen-xl">
                      <img
                        className="w-full rounded-lg"
                        src="https://i.imgur.com/5B3Y5ue.jpg"
                        alt="글 내용 이미지"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    </div>
                    <div className="mt-6 space-y-6 text-gray-500">
                      <p className="text-lg leading-7">
                        내용이 잘 들어왔니? 여기서부터
                        <br />
                        <strong>
                          {board.content && board.content}여기까지
                          <br />
                        </strong>
                        다양한 업데이트 예정입니다.
                        <br />
                        <br />
                        이번 업데이트에서는 새로운 맵과 아이템, 몬스터 등이
                        추가될 예정입니다. 게임 내 전반적인 밸런스 조정과 함께,
                        새로운 시스템도 추가될 예정입니다.
                        <br />
                        <br />
                        기대해 주세요!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6  rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                  <div className="flex flex-row">
                    <div className="pr-16 text-gray-500">정재우</div>
                    <div className="text-black-700">재밋겟다</div>
                  </div>
                  <textarea
                    className="placeholder:text-slate-600 my-6 w-full rounded-lg bg-white p-6 shadow sm:text-sm"
                    placeholder="줄바꿈 Shift+Enter"
                  ></textarea>
                  <Button variant="gradient" className="text-right">
                    등록
                  </Button>
                </div>
                <div className="mt-6 text-right">
                  <Link to={"/board"}>
                    <Button variant="gradient">목록으로</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BoardDetail;
