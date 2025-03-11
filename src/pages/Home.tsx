import LinkBtns from "../components/LinkBtns";
import Title from "../assets/title.png";

export default function Home() {
  return (
    <main className="h-dvh flex items-center justify-center flex-col bg-[url(/src/assets/title-bg.png)] bg-repeat overflow-x-hidden">
      <section className="relative">
        <img
          src={Title}
          alt="Bust a Move"
          className="w-96 lg:w-4xl h-auto animate-pulse p-8"
        />
        <div className="animate-slide absolute -top-12">
          <div className="w-[98px] h-[98px] bg-[url(/src/assets/title-run.png)] bg-cover animate-run"></div>
        </div>
        <div className="flex gap-2 relative m-auto w-max">
          <LinkBtns to={"game"} text={"START"} />
          <LinkBtns to={"scoreboard"} text={"SCOREBOARD"} />
          <div className="w-[98px] h-[98px] bg-[url(/src/assets/title-look.png)] bg-cover animate-look absolute top-16 right-1/12 sm:-top-1/2 sm:-right-1/2"></div>
        </div>
      </section>
    </main>
  );
}
