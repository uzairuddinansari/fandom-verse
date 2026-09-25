import React, { useEffect, useState } from "react";
import galleryData from "../../JSON/Game/GameGellery.json";
import galleryImages from "../../JSON/Game/GameGellery.js";
import "../../styles/GalleryGrid.css";

const STORAGE_KEY = "fandomverse_saved_articles";

const GalleryGrid = () => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);

      if (storedItems) {
        setSavedItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Unable to load saved items:", error);
    }
  }, []);

  const getImage = (gameName) => {
    const imageItem = galleryImages.find(
      (item) => item.gameName === gameName
    );

    return imageItem?.image;
  };

  const handleSaveGallery = (item) => {
    try {
      const alreadySaved = savedItems.some(
        (savedItem) =>
          savedItem.id === item.id &&
          savedItem.savedType === "gallery"
      );

      let updatedItems;

      if (alreadySaved) {
        updatedItems = savedItems.filter(
          (savedItem) =>
            !(
              savedItem.id === item.id &&
              savedItem.savedType === "gallery"
            )
        );
      } else {
        const image = getImage(item.gameName);

        const galleryToSave = {
          ...item,
          image,
          savedName: item.title,
          savedType: "gallery",
          savedAt: new Date().toISOString()
        };

        updatedItems = [...savedItems, galleryToSave];
      }

      setSavedItems(updatedItems);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedItems)
      );
    } catch (error) {
      console.error("Unable to save gallery item:", error);
    }
  };

  const isSaved = (id) => {
    return savedItems.some(
      (item) =>
        item.id === id &&
        item.savedType === "gallery"
    );
  };

  return (
    <section className="gallery-section">
      <div className="gallery-container">

        <div className="gallery-heading">
          <div>
            <span className="gallery-eyebrow">
              VISUAL ARCHIVE
            </span>

            <h2 className="gallery-title">
              Gaming Gallery
            </h2>
          </div>

          <div className="gallery-saved-count">
            <span className="gallery-saved-dot"></span>

            <span>
              {savedItems.filter(
                (item) => item.savedType === "gallery"
              ).length} Saved
            </span>
          </div>
        </div>

        <div className="gallery-grid">
          {galleryData.map((item, index) => {
            const image = getImage(item.gameName);
            const saved = isSaved(item.id);

            return (
              <article
                className={`gallery-card ${
                  saved ? "gallery-card-saved" : ""
                }`}
                key={item.id}
                style={{
                  "--card-index": index
                }}
              >
                <img
                  src={image}
                  alt={item.title}
                  className="gallery-image"
                  loading="lazy"
                />

                <div className="gallery-overlay"></div>

                <button
                  type="button"
                  className={`gallery-save-btn ${
                    saved ? "saved" : ""
                  }`}
                  onClick={() => handleSaveGallery(item)}
                  aria-label={
                    saved
                      ? `Remove ${item.title} from saved`
                      : `Save ${item.title}`
                  }
                >
                  <span>
                    {saved ? "✓" : "♡"}
                  </span>
                </button>

                <div className="gallery-content">
                  <span className="gallery-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="gallery-anime">
                    {item.gameName}
                  </span>

                  <h3 className="gallery-card-title">
                    {item.title}
                  </h3>

                  <span className="gallery-view">
                    Explore
                    <span>→</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GalleryGrid;