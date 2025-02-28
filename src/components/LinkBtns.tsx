import { Link } from "react-router";

type LinkProps = {
  to: string;
  text: string;
};

export default function LinkBtns({ to, text }: LinkProps) {
  return (
    <Link to={to} className="p-4 bg-blue-400 text-black rounded-2xl">
      {text}
    </Link>
  );
}
