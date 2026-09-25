import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, CalendarDays, Clock3, Minus, Plus, ShoppingBag, Trash2, Users, X } from "lucide-react";
import { formatPrice } from "../../fandom/catalog";
import { cartTotals, changeQuantity, clearCart, useCart } from "../../fandom/store";
import Chatbot from "./Chatbot";

const TAX_RATE = 0.05;

function CartDrawer({ open, onClose }) {
  const cart = useCart();
  const { count, subtotal } = cartTotals(cart);
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 6;
  const tax = subtotal * TAX_RATE;
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fv-drawer-backdrop" onMouseDown={onClose}>
      <aside className="fv-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" onMouseDown={(event) => event.stopPropagation()}>
        <header>
          <div>
            <span className="fv-eyebrow">Temporary cart</span>
            <h2>Your items ({count})</h2>
          </div>
          <button ref={closeRef} type="button" className="fv-icon-button" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="fv-empty fv-drawer-empty">
            <ShoppingBag size={32} />
            <h3>Your cart is empty</h3>
            <p>Open any merch item and choose “Add to cart”.</p>
            <Link className="fv-button" to="/search?type=merchandise" onClick={onClose}>Browse merchandise</Link>
          </div>
        ) : (
          <>
            <ul className="fv-cart-lines">
              {cart.map((line) => (
                <li key={line.lineId}>
                  <img src={line.image} alt="" />
                  <div>
                    <strong>{line.title}</strong>
                    <small>{line.categoryName} · {line.edition}</small>
                    <div className="fv-qty">
                      <button type="button" onClick={() => changeQuantity(line.lineId, -1)} aria-label={`Decrease ${line.title}`}><Minus size={14} /></button>
                      <span aria-label="Quantity">{line.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(line.lineId, 1)} aria-label={`Increase ${line.title}`}><Plus size={14} /></button>
                    </div>
                  </div>
                  <span className="fv-line-total">{formatPrice(line.price * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="fv-cart-summary">
              <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div><dt>Shipping {subtotal >= 100 && <small>(free over $100)</small>}</dt><dd>{shipping ? formatPrice(shipping) : "Free"}</dd></div>
              <div><dt>Tax (5%)</dt><dd>{formatPrice(tax)}</dd></div>
              <div className="total"><dt>Total</dt><dd>{formatPrice(subtotal + shipping + tax)}</dd></div>
            </dl>
            <footer>
              <button type="button" className="fv-button" disabled title="Checkout is not part of this demo">Checkout unavailable (demo)</button>
              <button type="button" className="fv-button-outline danger" onClick={clearCart}><Trash2 size={15} /> Empty cart</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

/* Simulated visitor counter: +1 once per browser session, stored in localStorage. */
const countVisit = () => {
  try {
    const stored = Number(localStorage.getItem("fandomverse_visitors")) || 12840;
    if (sessionStorage.getItem("fandomverse_visited")) return stored;
    sessionStorage.setItem("fandomverse_visited", "1");
    localStorage.setItem("fandomverse_visitors", String(stored + 1));
    return stored + 1;
  } catch {
    return 12840;
  }
};

function StatusBar() {
  const [now, setNow] = useState(() => new Date());
  const [visitors] = useState(countVisit);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="fv-sitebar" aria-label="Date, time and visitor count">
      <span><CalendarDays size={13} /> {now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</span>
      <span><Clock3 size={13} /> <time dateTime={now.toISOString()}>{now.toLocaleTimeString("en-GB")}</time></span>
      <span><Users size={13} /> {visitors.toLocaleString()}<span className="sr-only"> visitors</span></span>
    </div>
  );
}

/*
  New pages start at the top. Switching tabs inside the same hub keeps the
  tab bar in view instead of jumping back up to the hero.
*/
export function ScrollToTop() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);
  useEffect(() => {
    const hub = (path) => path.split("/")[1]?.toLowerCase();
    const sameHub = hub(previous.current) === hub(pathname) && hub(pathname) !== "detail";
    previous.current = pathname;
    const content = document.getElementById("hub-content");
    if (sameHub && content) {
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fv-nav-h")) || 80;
      const top = content.getBoundingClientRect().top + window.scrollY - navHeight;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "instant" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* Floating tools available on every page: cart, chatbot, clock + visitor counter, back-to-top. */
export default function SiteTools() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { count } = cartTotals(cart);
  const closeCart = useCallback(() => setCartOpen(false), []);

  useEffect(() => {
    const open = () => setCartOpen(true);
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("fandomverse:cart-open", open);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("fandomverse:cart-open", open);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <StatusBar />
      <div className="fv-floating">
        {showTop && (
          <button type="button" className="fv-float-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            <ArrowUp size={18} />
          </button>
        )}
        <button type="button" className="fv-float-button fv-cart-launch" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${count} items`}>
          <ShoppingBag size={19} />
          {count > 0 && <span>{count}</span>}
        </button>
        <Chatbot />
      </div>
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
}
