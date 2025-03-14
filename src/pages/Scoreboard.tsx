import { useQuery } from "@tanstack/react-query";
import { getScores } from "../db/queries";

export default function Scoreboard() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["scores"],
    queryFn: getScores,
  });

  return (
    <main className="h-dvh">
      <h1>High Scores</h1>
      {data &&
        data.map((doc, i) => {
          console.log(doc);
          return (
            <div key={i}>
              <p>{doc.name}</p>
              <p>{doc.score}</p>
            </div>
          );
        })}
      {isError && <p>Error occured!</p>}
      {isLoading && <p>Loading...</p>}
    </main>
  );
}
