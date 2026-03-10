import { useEffect, useState, useCallback } from "react";
import styles from "./Projetos.module.css";
import { userData } from "../../data/userData.js";
import BackgroundCanvas from "../../components/BackgroundCanvas";

// ✏️ IMAGENS DOS CARDS — adicione suas imagens em src/assets/ e importe aqui
import portfolioImg from "../../assets/eradogelo.gif";
import Timerimg from "../../assets/teste.gif";
//import bisnaguinha from "../..assets/NomedoGif ou nome da img";

// ✏️ MAPA DE IMAGENS — relacione o nome exato do repo com a imagem importada
const repoImages = {
  "Portifolio": portfolioImg,
  "timer---js" : Timerimg,
  //"NomedoRepositorio" bisnaguinha,
};

// ✏️ REPOS EM DESTAQUE no carrossel — PARA DESTACAR PROJETOS NO CARROSEL - 
const featuredRepos = [
  "Portifolio",
  "timer---js",
];

export default function Projetos() {
  const [repos, setRepos] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function buscarRepos() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${userData.githubName}/repos`
        );
        const data = await response.json();

        const filtrados = data
          .filter((repo) => !repo.fork && repo.visibility === "public")
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setRepos(filtrados);

        const destaque = featuredRepos
          .map((name) => filtrados.find((r) => r.name === name))
          .filter(Boolean);

        setFeatured(destaque);
      } catch (error) {
        console.error(error);
      }
    }

    buscarRepos();
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? featured.length - 1 : c - 1));
  }, [featured.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === featured.length - 1 ? 0 : c + 1));
  }, [featured.length]);

  // Retorna imagem customizada ou fallback do GitHub
  function getRepoImage(repo) {
    return repoImages[repo.name] || `https://opengraph.githubassets.com/1/${repo.full_name}`;
  }

  return (
    <section className={styles.projetos}>
      <BackgroundCanvas />
      <h1 className={styles.h1}>Meus projetos</h1>
      <p>Veja aqui um pouco dos meus projetos!</p>

      {/* ── CARROSSEL ── */}
      {featured.length > 0 && (
        <div className={styles.carrosselWrapper}>
          <h2 className={styles.carrosselTitle}>
            <span className={styles.destaqueBadge}>✦ Destaque</span>
          </h2>

          <div className={styles.carrossel}>
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={prev}
              aria-label="Anterior"
            >
              ‹
            </button>

            {featured.map((repo, i) => (
              <div
                key={repo.id}
                className={`${styles.featuredCard} ${
                  i === current ? styles.featuredActive : styles.featuredHidden
                }`}
              >
                <div className={styles.featuredImage}>
                  <img src={getRepoImage(repo)} alt={repo.name} />
                  <div className={styles.featuredOverlay} />
                </div>

                <div className={styles.featuredContent}>
                  <h3 className={styles.featuredName}>{repo.name}</h3>
                  <p className={styles.featuredDesc}>
                    {repo.description || "Sem descrição disponível."}
                  </p>

                  <div className={styles.featuredMeta}>
                    {repo.language && (
                      <span className={styles.language}>{repo.language}</span>
                    )}
                    <span className={styles.stars}>⭐ {repo.stargazers_count}</span>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.featuredButton}
                  >
                    Ver projeto →
                  </a>
                </div>
              </div>
            ))}

            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={next}
              aria-label="Próximo"
            >
              ›
            </button>
          </div>

          <div className={styles.dots}>
            {featured.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── GRID DE CARDS ── */}
      <div className={styles.grid}>
        {repos.map((repo) => (
          <div key={repo.id} className={styles.card}>
            <div className={styles.image}>
              <img src={getRepoImage(repo)} alt={repo.name} />
            </div>

            <div className={styles.content}>
              <h2>{repo.name}</h2>
              <p>{repo.description || "Sem descrição disponível."}</p>

              <div className={styles.info}>
                <span className={styles.language}>
                  {repo.language || "N/A"}
                </span>
                <span>⭐ {repo.stargazers_count}</span>
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                Ver projeto →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
