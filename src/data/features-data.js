import {
  StarIcon,
  ArrowPathIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/solid";

export const featuresData = [
  {
    color: "blue",
    title: "지역별",
    icon: StarIcon,
    description: "지역별 검색",
    path: "/home",
  },
  {
    color: "red",
    title: "테마별",
    icon: ArrowPathIcon,
    description: "테마별 검색",
    path: "/home",
  },
  {
    color: "teal",
    title: "후기",
    icon: FingerPrintIcon,
    description: "사용자 후기 게시판",
    path: "/board",
  },
];

export default featuresData;
