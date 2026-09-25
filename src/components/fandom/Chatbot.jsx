import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import knowledge from "../../JSON/chatbot.json";
import { allContent, categories, detailPath, sectionPath, sortItems } from "../../fandom/catalog";

const categoryWords = {
  anime: ["anime"],
  gaming: ["gaming", "game", "games", "gamer", "esports"],
  movies: ["movie", "movies", "film", "films", "cinema"],
  "tv-shows": ["tv", "tv show", "tv shows", "series", "netflix"],
  "k-pop": ["k-pop", "kpop", "k pop", "idol", "korean"],
  comics: ["comic", "comics", "marvel", "dc"],
  manga: ["manga"],
};

const hrefFor = (item) => (["article", "character", "event"].includes(item.type) ? detailPath(item) : sectionPath(item));

const pick = (filter, limit = 3) => sortItems(allContent.filter(filter), "featured").slice(0, limit);

const hasWord = (text, word) => new RegExp(`(^|[^a-z])${word.replace(/[-\s]/g, "[-\\s]?")}([^a-z]|$)`).test(text);

/* Rule-based responder: categories → interests → FAQ intents → catalog search → fallback. */
function respond(input) {
  const text = input.toLowerCase().trim();

  const interest = Object.entries(knowledge.interests).find(([name]) => hasWord(text, name));
  const categorySlug = Object.keys(categoryWords).find((slug) => categoryWords[slug].some((word) => hasWord(text, word)));

  if (categorySlug) {
    const category = categories.find((entry) => entry.slug === categorySlug);
    const tags = interest?.[1];
    const items = pick((item) => item.category === categorySlug && item.type !== "gallery" && (!tags || item.tags?.some((tag) => tags.includes(tag))));
    return {
      text: `${category.name}: ${category.summary} Here are a few picks to start with:`,
      items: items.length ? items : pick((item) => item.category === categorySlug),
      links: [{ label: `Open the ${category.name} hub`, to: category.path }],
    };
  }

  if (interest) {
    const [name, tags] = interest;
    return {
      text: `Love ${name}? You might enjoy these:`,
      items: pick((item) => item.type !== "gallery" && item.tags?.some((tag) => tags.includes(tag))),
      links: [{ label: `Search “${name}”`, to: `/search?q=${encodeURIComponent(tags[0])}` }],
    };
  }

  const intent = knowledge.intents.find((entry) => entry.keywords.some((keyword) => text.includes(keyword)));
  if (intent) {
    const items = intent.show
      ? pick((item) => item.type === intent.show.type && (!intent.show.status || item.status === intent.show.status))
      : [];
    return { text: intent.answer, links: intent.links, items, quickReplies: intent.quickReplies };
  }

  const words = text.split(/\s+/).filter((word) => word.length > 2);
  const found = words.length
    ? pick((item) => words.every((word) => `${item.title} ${item.franchise || ""} ${(item.tags || []).join(" ")}`.toLowerCase().includes(word)))
    : [];
  if (found.length) {
    return {
      text: `Here’s what I found for “${input.trim()}”:`,
      items: found,
      links: [{ label: "See all results", to: `/search?q=${encodeURIComponent(input.trim())}` }],
    };
  }

  return { text: knowledge.fallback, quickReplies: knowledge.quickReplies.slice(0, 4) };
}

const initialMessages = () => [{ from: "bot", text: knowledge.greeting, quickReplies: knowledge.quickReplies }];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (value) => {
    if (!value.trim() || typing) return;
    setMessages((current) => [...current, { from: "user", text: value.trim() }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { from: "bot", ...respond(value) }]);
      setTyping(false);
    }, 450);
  };

  const last = messages[messages.length - 1];

  return (
    <>
      {open && (
        <aside className="fv-chat" role="dialog" aria-label="Nova chat assistant">
          <header>
            <span className="fv-chat-avatar"><Bot size={20} /></span>
            <div>
              <strong>Nova</strong>
              <small><i /> FandomVerse guide · replies instantly</small>
            </div>
            <button type="button" onClick={() => setMessages(initialMessages())} aria-label="Restart conversation">
              <RotateCcw size={16} />
            </button>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </header>

          <div className="fv-chat-log" ref={logRef} aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`fv-chat-message ${message.from}`}>
                <p>{message.text}</p>
                {message.items?.length > 0 && (
                  <ul className="fv-chat-items">
                    {message.items.map((item) => (
                      <li key={item.uid}>
                        <Link to={hrefFor(item)} onClick={() => setOpen(false)}>
                          <img src={item.image} alt="" />
                          <span>
                            <strong>{item.title}</strong>
                            <small>{item.categoryName}</small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {message.links?.length > 0 && (
                  <div className="fv-chat-links">
                    {message.links.map((link) => (
                      <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label} →</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="fv-chat-message bot fv-typing" aria-label="Nova is typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          {!typing && last.from === "bot" && (
            <div className="fv-chat-quick" aria-label="Suggested questions">
              {(last.quickReplies || knowledge.quickReplies.slice(0, 3)).map((reply) => (
                <button key={reply} type="button" onClick={() => send(reply)}>{reply}</button>
              ))}
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <label className="sr-only" htmlFor="nova-input">Ask Nova</label>
            <input id="nova-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a fandom…" autoComplete="off" />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              <Send size={17} />
            </button>
          </form>
        </aside>
      )}

      <button type="button" className={`fv-chat-launch ${open ? "is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close chat" : "Chat with Nova"}>
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        <span>{open ? "Close" : "Ask Nova"}</span>
      </button>
    </>
  );
}
