import { useQuery } from "@tanstack/react-query";
import { getScores } from "../services/queries";
import LinkBtn from "../components/LinkBtn";

export default function Scoreboard() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["scores"],
    queryFn: getScores,
  });

  return (
    <main className="h-dvh p-8">
      <div className="p-8 border-2 border-white">
        <h1 className="m-auto w-max p-4">HIGH SCORES</h1>
        <div className="[&>*:nth-child(even)]:border-white [&>*:nth-child(even)]:border-2">
          {data &&
            data.map((doc, i) => {
              return (
                <div
                  key={i}
                  className="grid grid-cols-[40px_1fr] sm:grid-cols-[40px_2fr_1fr] gap-1 p-4"
                >
                  <span>{i + 1}.</span>
                  <p className="text-center sm:text-left">{doc.name}</p>
                  <p className="col-span-2 text-center sm:col-span-1 sm:text-left">
                    {doc.score}
                  </p>
                </div>
              );
            })}
          {isError && <p>Error retrieving scores. Try again later.</p>}
          {isLoading && <p>Loading...</p>}
        </div>
      </div>
      <div className="m-auto w-max p-4">
        <LinkBtn to="/" text="BACK" />
      </div>
    </main>
  );
}
