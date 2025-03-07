import { Link } from "react-router";

type LinkProps = {
  to: string;
  text: string;
};

export default function LinkBtns({ to, text }: LinkProps) {
  return (
    <Link
      to={to}
      className="px-4 py-2 bg-black border-s-white border-2 rounded-2xl hover:cursor-pointer active:scale-95 focus:bg-blue-500"
    >
      {text}
    </Link>
  );
}
