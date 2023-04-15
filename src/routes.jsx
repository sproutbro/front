import {
  Board,
  Home,
  Profile,
  SignIn,
  SignUp,
  BoardCreate,
  BoardDetail,
} from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";

export const routes = [
  {
    icon: HomeIcon,
    name: "홈",
    path: "/home",
    element: <Home />,
    href: "있음",
  },
  {
    icon: UserCircleIcon,
    name: "프로필",
    path: "/profile",
    element: <Profile />,
  },
  {
    icon: ArrowRightOnRectangleIcon,
    name: "로그인",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    icon: UserPlusIcon,
    name: "회원가입",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    icon: ClipboardIcon,
    name: "게시판",
    path: "/board",
    element: <Board />,
  },
  {
    icon: ClipboardIcon,
    name: "상세보기",
    path: "/board/:id",
    element: <BoardDetail />,
  },

  {
    icon: ClipboardIcon,
    name: "글쓰기",
    path: "/board/edit",
    element: <BoardCreate />,
  },
];

export default routes;
