import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";

import animeModel from "../model/Anim.glb";
import gamingModel from "../model/gaming.glb";
import moviesModel from "../model/movies.glb";
import tvShowsModel from "../model/tvshows.glb";
import kpopModel from "../model/kpop.glb";
import comicsModel from "../model/comics.glb";
import mangaModel from "../model/manga.glb";

import "../styles/Category.css";

const categories = [
  { name: "Anime", model: animeModel, link: "/Anime" },
  { name: "Gaming", model: gamingModel, link: "/gaming" },
  { name: "Movies", model: moviesModel, link: "/movies" },
  { name: "TV_Shows", model: tvShowsModel, link: "/TV_Shows" },
  { name: "K_Pop", model: kpopModel, link: "/K_Pop" },
  { name: "Comics", model: comicsModel, link: "/comics" },
  { name: "Manga", model: mangaModel, link: "/Manga" },
];

function CategoryModel({ src }) {
  const { scene } = useGLTF(src);

  return (
    <primitive
      object={scene.clone()}
      scale={1.2}
      position={[0, -0.2, 0]}
    />
  );
}

function CategoryCard({ category }) {
  return (
    <a href={category.link} className="category-card">
      <div className="category-model">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 35,
          }}
        >
          <ambientLight intensity={2} />

          <directionalLight
            position={[3, 4, 5]}
            intensity={3}
          />

          <Environment preset="city" />

          <CategoryModel src={category.model} />
        </Canvas>
      </div>

      <span className="category-name">
        {category.name}
      </span>
    </a>
  );
}

export default function Category() {
  return (
    <section className="category-section">
      <h2 className="category-title">
        Explore Categories
      </h2>

      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}

useGLTF.preload(animeModel);
useGLTF.preload(gamingModel);
useGLTF.preload(moviesModel);
useGLTF.preload(tvShowsModel);
useGLTF.preload(kpopModel);
useGLTF.preload(comicsModel);
useGLTF.preload(mangaModel);