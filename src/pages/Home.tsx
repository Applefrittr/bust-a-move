import LinkBtn from "../components/LinkBtn";
import Title from "../assets/title.png";

export default function Home() {
  return (
    <main className="h-dvh flex items-center justify-center flex-col bg-[url(/src/assets/title-bg.png)] bg-repeat overflow-x-hidden">
      <section className="relative min-w-min w-1/2 max-w-3xl flex flex-col items-center">
        <img
          src={Title}
          alt="Bust a Move"
          className="min-w-3xs w-full h-auto animate-pulse p-4 flex-auto"
        />
        <div className="animate-slide absolute -top-16">
          <div className="w-[98px] h-[98px] bg-[url(/src/assets/title-run.png)] bg-cover animate-run"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 relative m-auto w-max">
          <LinkBtn to={"game"} text={"START"} />
          <LinkBtn to={"options"} text={"OPTIONS"} />
          <LinkBtn to={"scoreboard"} text={"SCOREBOARD"} />
          <div className="w-[98px] h-[98px] bg-[url(/src/assets/title-look.png)] bg-cover animate-look absolute top-36 right-1/12 md:-top-1/2 md:-right-1/4"></div>
        </div>
      </section>
      <p className="text-[.50rem] sm:text-[.70rem] p-2 fixed bottom-0 text-center">
        &copy;Taito Re-created with Web Technology by Applefrittr 2025
      </p>
    </main>
  );
}
