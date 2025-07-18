import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Clock } from "~/clock/clock";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="pt-40 pb-10 pl-5 pr-5 bg-[url(/void.jpg)] bg-no-repeat bg-cover bg-center">
      <Welcome/>
      <Clock/>
    </div>
  );
}
