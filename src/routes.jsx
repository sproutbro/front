import { Home, Profile, SignIn, SignUp, Test } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

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
    icon: UserPlusIcon,
    name: "테스트",
    path: "/test",
    element: <Test />,
  },
  {
    icon: DocumentTextIcon,
    name: "문서",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },
];

export default routes;
