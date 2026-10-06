import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { About } from "@/components/sections/about";
import { ArticleList } from "@/components/articles/article-list";
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Process />
      <About />
      <ArticleList compact />
    </>
  );
}
