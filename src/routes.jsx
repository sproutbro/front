import { Board, Home, Profile, SignIn, SignUp } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import PostCreate from "./pages/post-create";

export const routes = [
  {
    icon: HomeIcon,
    name: "홈",
    path: "/home",
    element: <Home />,
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
    icon: DocumentTextIcon,
    name: "문서",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },
  {
    icon: ClipboardIcon,
    name: "글쓰기",
    path: "/board/detail",
    element: <PostCreate />,
  },
];

export default routes;
