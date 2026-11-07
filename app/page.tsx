import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { ArticleList } from "@/components/articles/article-list";
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <About />
      <ArticleList compact />
    </>
  );
}
