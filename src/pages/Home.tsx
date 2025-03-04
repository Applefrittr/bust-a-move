import LinkBtns from "../components/LinkBtns";

export default function Home() {
  return (
    <section className="flex items-center justify-center flex-col gap-8 h-full">
      <h1>BUST A MOVE</h1>
      <div className="flex gap-2">
        <LinkBtns to={"game"} text={"Start"} />
        <LinkBtns to={"scoreboard"} text={"Scoreboard"} />
        <LinkBtns to={"sprites"} text={"Sprites"} />
      </div>
    </section>
  );
}
