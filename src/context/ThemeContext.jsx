import { createContext, useContext, useEffect, useState } from "react";
import { defaultAppearanceSettings } from "../config/appearanceSettings";
import {collection,addDoc,getDocs, deleteDoc,doc,setDoc,getDoc} from "firebase/firestore";
import { db } from "../components/firebase";

const ThemeContext = createContext();

const getSavedSettings = () => {
  try {
    const saved = localStorage.getItem("lunaAppearanceSettings");
    return saved ? JSON.parse(saved) : defaultAppearanceSettings;
  } catch {
    return defaultAppearanceSettings;
  }
};

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState(getSavedSettings);
  const [customFonts, setCustomFonts] = useState([]);

  useEffect(() => {
    const loadAppearance = async () => {
      try {
        const appearanceDoc = await getDoc(
          doc(db, "appearance", "settings")
        );

        if (appearanceDoc.exists()) {
          const data = appearanceDoc.data();

          setSettings(prev => ({
            ...prev,
            ...data,
            theme: {
              ...prev.theme,
              ...data.theme
            },
            typography: {
              ...prev.typography,
              ...data.typography
            }
          }));
        }
      } catch (error) {
        console.error("Appearance load failed:", error);
      }
    };

    loadAppearance();
  }, []);

  useEffect(() => {
    const loadCustomFonts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "customFonts"));

        const fonts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setCustomFonts(fonts);

        for (const font of fonts) {
          const fontFace = new FontFace(
            font.name,
            `url(${font.url})`
          );

          await fontFace.load();
          document.fonts.add(fontFace);
        }
      } catch (error) {
        console.error("Fonts load failed:", error);
      }
    };

    loadCustomFonts();
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--color-primary", settings.theme.primary);
    root.style.setProperty("--color-secondary", settings.theme.secondary);
    root.style.setProperty("--color-background", settings.theme.background);
    root.style.setProperty("--color-text", settings.theme.text);
    root.style.setProperty("--color-muted-text", settings.theme.mutedText);
    root.style.setProperty("--color-border", settings.theme.border);

    root.style.setProperty(
      "--font-heading",
      `"${settings.typography.headingFont}"`
    );

    root.style.setProperty(
      "--font-body",
      `"${settings.typography.bodyFont}"`
    );

    root.style.setProperty(
      "--heading-weight",
      settings.typography.headingWeight
    );

    root.style.setProperty(
      "--body-weight",
      settings.typography.bodyWeight
    );

    localStorage.setItem(
      "lunaAppearanceSettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const saveSettingsToFirestore = async updatedSettings => {
    try {
      await setDoc(
        doc(db, "appearance", "settings"),
        updatedSettings,
        { merge: true }
      );
    } catch (error) {
      console.error("Settings save failed:", error);
    }
  };

  const updateTheme = async (key, value) => {
    const updatedSettings = {
      ...settings,
      theme: {
        ...settings.theme,
        [key]: value
      }
    };

    setSettings(updatedSettings);

    await saveSettingsToFirestore({
      theme: updatedSettings.theme
    });
  };

  const updateTypography = async (key, value) => {
    const updatedSettings = {
      ...settings,
      typography: {
        ...settings.typography,
        [key]: value
      }
    };

    setSettings(updatedSettings);

    await saveSettingsToFirestore({
      typography: updatedSettings.typography
    });
  };

  const resetSettings = async () => {
    setSettings(defaultAppearanceSettings);

    await saveSettingsToFirestore(defaultAppearanceSettings);
  };

  const addCustomFont = async file => {
    if (!file) return;

    const allowed = [".woff2", ".woff", ".ttf"];

    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowed.includes(extension)) {
      alert("Please upload a WOFF2, WOFF, or TTF font file.");
      return;
    }

    const fontName = file.name
      .replace(/\.(woff2?|ttf)$/i, "")
      .replace(/[-_]/g, " ");

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "luna_fonts");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/i6su4pd1/raw/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      const fontUrl = data.secure_url;

      const fontDoc = await addDoc(
        collection(db, "customFonts"),
        {
          name: fontName,
          url: fontUrl,
          format: extension.replace(".", ""),
          createdAt: new Date()
        }
      );

      const fontFace = new FontFace(
        fontName,
        `url(${fontUrl})`
      );

      await fontFace.load();

      document.fonts.add(fontFace);

      setCustomFonts(prev => [
        ...prev.filter(font => font.name !== fontName),
        {
          id: fontDoc.id,
          name: fontName,
          url: fontUrl
        }
      ]);

      const updatedSettings = {
        ...settings,
        typography: {
          ...settings.typography,
          headingFont: fontName,
          bodyFont: fontName
        }
      };

      setSettings(updatedSettings);

      await saveSettingsToFirestore({
        typography: updatedSettings.typography
      });

      alert("Font uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Font upload failed.");
    }
  };

  const deleteCustomFont = async fontId => {
    try {
      await deleteDoc(doc(db, "customFonts", fontId));

      setCustomFonts(prev =>
        prev.filter(font => font.id !== fontId)
      );

      alert("Font deleted successfully!");
    } catch (error) {
      console.error("Font delete failed:", error);
      alert("Font delete failed.");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        settings,
        updateTheme,
        updateTypography,
        resetSettings,
        customFonts,
        addCustomFont,
        deleteCustomFont
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);