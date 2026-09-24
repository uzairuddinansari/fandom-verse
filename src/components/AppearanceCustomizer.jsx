
import { useTheme } from "../context/ThemeContext";
import "../styles/AppearanceCustomizer.css";
import { useRef } from "react";

function AppearanceCustomizer() {
  const {
    settings,
    updateTheme,
    updateTypography,
    resetSettings,
    customFonts,
    addCustomFont,
    deleteCustomFont
  } = useTheme();

  const fontInputRef = useRef(null);

  return (
    <section className="appearance_customizer">
      <div className="appearance_header">
        <div>
          <span>WEBSITE CUSTOMIZATION</span>
          <h2>Appearance</h2>
          <p>Control your website's visual style from one place.</p>
        </div>

        <div className="appearance_header_actions">
          <button
            className="appearance_reset_btn"
            onClick={resetSettings}
          >
            Reset
          </button>

          <button className="appearance_save_btn">
            Save Changes
          </button>
        </div>
      </div>

      <div className="appearance_section">
        <div className="appearance_section_title">
          <h3>Theme Colors</h3>
          <p>Manage the colors used throughout your website.</p>
        </div>

        <div className="appearance_color_grid">
          {Object.entries(settings.theme).map(([key, value]) => (
            <div className="appearance_color_item" key={key}>
              <div
                className="appearance_color_preview"
                style={{ backgroundColor: value }}
              ></div>

              <div>
                <label>{key.replace(/([A-Z])/g, " $1")}</label>

                <div className="appearance_color_control">
                  <input
                    type="color"
                    value={value}
                    onChange={e => updateTheme(key, e.target.value)}
                  />

                  <input
                    type="text"
                    value={value}
                    onChange={e => updateTheme(key, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="appearance_section">
        <div className="appearance_section_title">
          <h3>Typography</h3>
          <p>Control the fonts used across your website.</p>
        </div>

        <div className="appearance_typography_grid">
          <div className="appearance_font_upload">
            <input
              ref={fontInputRef}
              type="file"
              accept=".woff2,.woff,.ttf"
              hidden
              onChange={e => addCustomFont(e.target.files[0])}
            />

            <button
              type="button"
              className="bg-amber-400 p-px100 active:scale-95"
              onClick={() => fontInputRef.current?.click()}
            >
              Upload Font
            </button>

            <span>WOFF2, WOFF or TTF</span>
          </div>

          <div className="appearance_field">
            <label>Heading Font</label>

            <select
              value={settings.typography.headingFont}
              onChange={e =>
                updateTypography("headingFont", e.target.value)
              }
            >
              <option>Inter</option>
              <option>Arial</option>
              <option>Roboto</option>
              <option>Poppins</option>
              <option>Montserrat</option>

              {customFonts.map(font => (
                <option key={font.name} value={font.name}>
                  {font.name}
                </option>
              ))}
            </select>

            {customFonts.length > 0 && (
              <div className="custom_fonts_list">
                {customFonts.map(font => (
                  <div
                    key={font.id}
                    className="custom_font_item"
                  >
                    <span>{font.name}</span>

                    <button
                      type="button"
                      onClick={() => deleteCustomFont(font.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="appearance_field">
            <label>Body Font</label>

            <select
              value={settings.typography.bodyFont}
              onChange={e =>
                updateTypography("bodyFont", e.target.value)
              }
            >
              <option>Inter</option>
              <option>Arial</option>
              <option>Roboto</option>
              <option>Poppins</option>
              <option>Montserrat</option>

              {customFonts.map(font => (
                <option key={font.name} value={font.name}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div className="appearance_field">
            <label>Heading Weight</label>

            <select
              value={settings.typography.headingWeight}
              onChange={e =>
                updateTypography(
                  "headingWeight",
                  Number(e.target.value)
                )
              }
            >
              <option value="400">Regular</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
              <option value="800">Extra Bold</option>
            </select>
          </div>

          <div className="appearance_field">
            <label>Body Weight</label>

            <select
              value={settings.typography.bodyWeight}
              onChange={e =>
                updateTypography(
                  "bodyWeight",
                  Number(e.target.value)
                )
              }
            >
              <option value="400">Regular</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
            </select>
          </div>
        </div>
      </div>

      <div className="appearance_preview">
        <span>LIVE PREVIEW</span>

        <h1>Your Website Heading</h1>

        <p>
          This is how your typography and theme settings will look
          on the website.
        </p>

        <button>Preview Button</button>
      </div>
    </section>
  );
}

export default AppearanceCustomizer;

