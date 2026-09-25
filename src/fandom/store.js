import { useSyncExternalStore } from "react";

/*
  Tiny browser-storage store shared by every page.
  - Bookmarks and the cart persist in localStorage.
  - Personal notes live in sessionStorage, so they vanish with the tab (SRS).
  Components subscribe with the hooks below and re-render on every change,
  including changes made in another tab.
*/
const KEYS = {
  bookmarks: "fandomverse_bookmarks",
  cart: "fandomverse_cart",
  notes: "fandomverse_notes",
};

const listeners = new Set();
const cache = new Map();

const storageFor = (key) => (key === KEYS.notes ? sessionStorage : localStorage);

const read = (key, fallback) => {
  if (!cache.has(key)) {
    try {
      cache.set(key, JSON.parse(storageFor(key).getItem(key)) ?? fallback);
    } catch {
      cache.set(key, fallback);
    }
  }
  return cache.get(key);
};

const write = (key, value) => {
  cache.set(key, value);
  try {
    storageFor(key).setItem(key, JSON.stringify(value));
  } catch {
    /* Storage can be full or blocked; the in-memory copy still works. */
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
  listeners.add(listener);
  const onStorage = (event) => {
    if (Object.values(KEYS).includes(event.key)) {
      cache.delete(event.key);
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

const EMPTY_LIST = [];
const EMPTY_NOTES = {};

/* Only the fields needed to render a saved card are stored. */
const snapshot = (item) => ({
  uid: item.uid,
  id: item.id,
  type: item.type,
  title: item.title,
  description: item.description,
  image: item.image,
  category: item.category,
  categoryName: item.categoryName,
  categoryPath: item.categoryPath,
  date: item.date || null,
  savedAt: new Date().toISOString(),
});

export const useBookmarks = () =>
  useSyncExternalStore(subscribe, () => read(KEYS.bookmarks, EMPTY_LIST));

export const isBookmarked = (uid) => read(KEYS.bookmarks, EMPTY_LIST).some((entry) => entry.uid === uid);

export const toggleBookmark = (item) => {
  const current = read(KEYS.bookmarks, EMPTY_LIST);
  const exists = current.some((entry) => entry.uid === item.uid);
  write(KEYS.bookmarks, exists ? current.filter((entry) => entry.uid !== item.uid) : [...current, snapshot(item)]);
  return !exists;
};

export const clearBookmarks = () => write(KEYS.bookmarks, []);

export const useNotes = () => useSyncExternalStore(subscribe, () => read(KEYS.notes, EMPTY_NOTES));

export const setNote = (uid, text) => write(KEYS.notes, { ...read(KEYS.notes, EMPTY_NOTES), [uid]: text });

export const useCart = () => useSyncExternalStore(subscribe, () => read(KEYS.cart, EMPTY_LIST));

export const addToCart = (item, edition = "Standard") => {
  const price = edition === "Deluxe" ? item.priceRange?.[1] ?? item.price : item.price;
  const lineId = `${item.uid}:${edition}`;
  const current = read(KEYS.cart, EMPTY_LIST);
  const existing = current.find((line) => line.lineId === lineId);
  write(
    KEYS.cart,
    existing
      ? current.map((line) => (line.lineId === lineId ? { ...line, quantity: line.quantity + 1 } : line))
      : [...current, { lineId, uid: item.uid, title: item.title, image: item.image, categoryName: item.categoryName, edition, price, quantity: 1 }],
  );
  window.dispatchEvent(new CustomEvent("fandomverse:cart-open"));
};

export const changeQuantity = (lineId, amount) =>
  write(
    KEYS.cart,
    read(KEYS.cart, EMPTY_LIST)
      .map((line) => (line.lineId === lineId ? { ...line, quantity: line.quantity + amount } : line))
      .filter((line) => line.quantity > 0),
  );

export const clearCart = () => write(KEYS.cart, []);

export const cartTotals = (cart) => ({
  count: cart.reduce((sum, line) => sum + line.quantity, 0),
  subtotal: cart.reduce((sum, line) => sum + line.price * line.quantity, 0),
});
