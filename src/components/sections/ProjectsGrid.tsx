import { HeroParallax, ParallaxProduct } from "@/components/ui/HeroParallax";
import { portfolioProjects } from "@/lib/projects";

const products: ParallaxProduct[] = portfolioProjects.map((p) => ({
  title: p.name,
  link: `/projects/${p.slug}`,
  thumbnail: p.image,
  category: p.category,
  year: p.year,
}));

export default function ProjectsGrid() {
  return <HeroParallax products={products} />;
}
