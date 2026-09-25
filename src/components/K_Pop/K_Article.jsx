import { useEffect, useState } from "react";
import articleData from "../../JSON/K_pop/K_pop_article.json";
import "../../styles/ArticleGrid.css";
import articleImages from "../../JSON/K_pop/K_pop_article";

const STORAGE_KEY = "fandomverse_saved_articles";

const ArticleGrid = () => {
  const [savedArticles, setSavedArticles] = useState([]);

  // Load saved articles from Local Storage
  useEffect(() => {
    try {
      const storedArticles = localStorage.getItem(STORAGE_KEY);
      console.log(articleImages);
      if (storedArticles) {
        setSavedArticles(JSON.parse(storedArticles));
      }
    } catch (error) {
      console.error("Unable to load saved articles:", error);
    }
  }, []);

  // Save / Remove article
  const handleSaveArticle = (article) => {
    try {
      const alreadySaved = savedArticles.some(
        (savedArticle) => savedArticle.id === article.id
      );

      let updatedArticles;

      if (alreadySaved) {
        // Remove article
        updatedArticles = savedArticles.filter(
          (savedArticle) => savedArticle.id !== article.id
        );
      } else {
        // Save complete article data
        const articleToSave = {
          ...article,
          savedAt: new Date().toISOString(),
          savedName: article.title,
        };

        updatedArticles = [...savedArticles, articleToSave];
      }

      setSavedArticles(updatedArticles);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedArticles)
      );
    } catch (error) {
      console.error("Unable to save article:", error);
    }
  };

  // Check if article is already saved
  const isArticleSaved = (articleId) => {
    return savedArticles.some(
      (article) => article.id === articleId
    );
  };

  return (
    <section className="article-section">
      <div className="article-container">

        {/* Section Header */}
        <div className="article-heading">
          <div>
            <span className="article-eyebrow">
              EXPLORE & DISCOVER
            </span>

            <h2 className="article-title">
              Latest Articles
            </h2>
          </div>

          <div className="saved-counter">
            <span className="saved-dot"></span>
            <span>
              {savedArticles.length} Saved
            </span>
          </div>
        </div>

        {/* Article Grid */}
        <div className="article-grid">

          {articleData.kpop.slice(0, 8).map((article, index) => {
            const saved = isArticleSaved(article.id);

            return (
              <article
                className={`article-card ${
                  saved ? "article-card-saved" : ""
                }`}
                key={article.id}
                style={{
                  "--card-delay": `${index * 80}ms`,
                }}
              >

                {/* Image */}
                <div className="article-image-wrapper">

                  <img
  src={articleImages[index]}
  alt={article.title}
  className="article-image"
  loading="lazy"
/>

                  {/* Category */}
                  {article.category && (
                    <span className="article-category">
                      {article.category}
                    </span>
                  )}

                  {/* Save Button */}
                  <button
                    type="button"
                    className={`save-article-btn ${
                      saved ? "saved" : ""
                    }`}
                    onClick={() => handleSaveArticle(article)}
                    aria-label={
                      saved
                        ? `Remove ${article.title} from saved articles`
                        : `Save ${article.title}`
                    }
                  >
                    <span className="save-icon">
                      {saved ? "✓" : "♡"}
                    </span>

                    <span className="save-text">
                      {saved ? "Saved" : "Save"}
                    </span>
                  </button>
                </div>

                {/* Content */}
                <div className="article-content">

                  <div className="article-meta">
                    {article.date && (
                      <span>{article.date}</span>
                    )}

                    {article.readTime && (
                      <>
                        <span className="meta-divider">
                          •
                        </span>

                        <span>
                          {article.readTime}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="article-card-title">
                    {article.title}
                  </h3>

                  {article.description && (
                    <p className="article-description">
                      {article.description}
                    </p>
                  )}

                  <div className="article-footer">

                    <span className="read-more">
                      Read Article
                      <span className="arrow">
                        →
                      </span>
                    </span>

                    {article.author && (
                      <span className="article-author">
                        {article.author}
                      </span>
                    )}

                  </div>
                </div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default ArticleGrid;