import LinkBtn from "../components/LinkBtn";
import Title from "../assets/title.png";

export default function Home() {
  return (
    <main className="h-dvh flex items-center justify-center flex-col bg-[url(/src/assets/title-bg.png)] bg-repeat overflow-x-hidden">
      <section className="relative">
        <img
          src={Title}
          alt="Bust a Move"
          className="m-auto w-96 lg:w-4xl h-auto animate-pulse p-8"
        />
        <div className="animate-slide absolute -top-12">
          <div className="w-[98px] h-[98px] bg-[url(/src/assets/title-run.png)] bg-cover animate-run"></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 relative m-auto w-max">
          <LinkBtn to={"game"} text={"START"} />
          <LinkBtn to={"options"} text={"OPTIONS"} />
          <LinkBtn to={"scoreboard"} text={"SCOREBOARD"} />
          <div className="w-[98px] h-[98px] bg-[url(/src/assets/title-look.png)] bg-cover animate-look absolute top-36 right-1/12 sm:-top-1/2 sm:-right-1/4"></div>
        </div>
      </section>
    </main>
  );
}
