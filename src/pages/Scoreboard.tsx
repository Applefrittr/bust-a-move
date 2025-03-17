import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getRounds, getScores } from "../services/queries";
import LinkBtn from "../components/LinkBtn";
import { useState } from "react";
import { DocumentData } from "firebase/firestore";
import UIBtn from "../components/UIBtn";

export default function Scoreboard() {
  const [toggleView, setToggleView] = useState(true);

  const scores = useQuery({
    queryKey: ["scores"],
    queryFn: getScores,
  });

  const rounds = useQuery({
    queryKey: ["rounds"],
    queryFn: getRounds,
  });

  return (
    <main className="min-h-svh p-8 bg-[url(/src/assets/title-bg.png)] bg-repeat">
      <div className="p-8 border-2 border-white bg-[#242424]">
        <UIBtn cb={() => setToggleView((prev) => !prev)}>SWITCH</UIBtn>
        {toggleView && (
          <LeaderBoardList
            query={scores}
            title={"HIGH SCORES"}
            field={"score"}
          />
        )}
        {!toggleView && (
          <LeaderBoardList
            query={rounds}
            title={"HIGHEST ROUND"}
            field={"round"}
          />
        )}

        <div className="m-auto w-max p-4">
          <LinkBtn to="/" text="BACK" />
        </div>
      </div>
    </main>
  );
}

function LeaderBoardList({
  query,
  title,
  field,
}: {
  query: UseQueryResult<DocumentData[], Error>;
  title: string;
  field: string;
}) {
  return (
    <>
      <h1 className="m-auto w-max p-4">{title}</h1>
      <div className="[&>*:nth-child(even)]:bg-white [&>*:nth-child(even)]:text-black">
        {query.data &&
          query.data.map((doc, i) => {
            return (
              <div
                key={i}
                className="grid grid-cols-[40px_1fr] sm:grid-cols-[40px_2fr_1fr] gap-1 p-4 min-w-max"
              >
                <span>{i + 1}.</span>
                <p className="text-center sm:text-left">{doc.name}</p>
                <p className="col-span-2 text-center sm:col-span-1 sm:text-left">
                  {doc[field]}
                </p>
              </div>
            );
          })}
        {query.isError && <p>Error retrieving query. Try again later.</p>}
        {query.isLoading && <p>Loading...</p>}
      </div>
    </>
  );
}
