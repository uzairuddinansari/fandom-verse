import { useState } from "react";
import { Bot, MessageSquarePlus, Pencil, Send, Trash2 } from "lucide-react";
import { knowledge, respond } from "../fandom/chatbotEngine";
import { deleteFaq, saveFaq, useAdminData } from "./adminStore";
import { EmptyState, PageHeader, Panel } from "./AdminUI";

const blank = { id: "", keywords: "", answer: "", linkLabel: "", linkTo: "" };

export default function ChatbotManager() {
  const { faqs } = useAdminData();
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState(null);

  const edit = (faq) =>
    setForm({ id: faq.id, keywords: faq.keywords.join(", "), answer: faq.answer, linkLabel: faq.links?.[0]?.label || "", linkTo: faq.links?.[0]?.to || "" });

  const submit = (event) => {
    event.preventDefault();
    const keywords = form.keywords.split(",").map((word) => word.trim().toLowerCase()).filter(Boolean);
    if (!keywords.length || form.answer.trim().length < 5) {
      setError("Add at least one keyword and an answer.");
      return;
    }
    if (form.linkTo && !form.linkTo.startsWith("/")) {
      setError("Links must be site paths that start with “/”, for example /Anime or /contact.");
      return;
    }
    saveFaq({
      id: form.id || `faq-${Date.now().toString(36)}`,
      keywords,
      answer: form.answer.trim(),
      links: form.linkTo ? [{ label: form.linkLabel || "Open page", to: form.linkTo }] : undefined,
    });
    setForm(blank);
    setError("");
  };

  return (
    <>
      <PageHeader eyebrow="Chatbot" title="Nova’s answers" description="Nova is rule-based: it matches keywords against a pre-scripted knowledge base. Answers you add here take priority over the built-in ones." />

      <div className="adm-grid adm-grid-2">
        <Panel title={form.id ? "Edit answer" : "Add an answer"}>
          <form className="adm-form" onSubmit={submit}>
            <label>
              <span>Keywords that trigger it (comma separated)</span>
              <input value={form.keywords} onChange={(event) => setForm({ ...form, keywords: event.target.value })} placeholder="tickets, entry fee, price of events" />
            </label>
            <label>
              <span>Nova’s answer</span>
              <textarea rows={4} value={form.answer} onChange={(event) => setForm({ ...form, answer: event.target.value })} placeholder="Most FandomVerse meetups are free to attend…" />
            </label>
            <div className="adm-form-grid">
              <label>
                <span>Link label (optional)</span>
                <input value={form.linkLabel} onChange={(event) => setForm({ ...form, linkLabel: event.target.value })} placeholder="See events" />
              </label>
              <label>
                <span>Link path (optional)</span>
                <input value={form.linkTo} onChange={(event) => setForm({ ...form, linkTo: event.target.value })} placeholder="/search?type=event" />
              </label>
            </div>
            {error && <p className="adm-error">{error}</p>}
            <div className="adm-actions">
              <button type="submit" className="adm-btn adm-btn-primary"><MessageSquarePlus size={16} /> {form.id ? "Save answer" : "Add answer"}</button>
              {form.id && <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setForm(blank)}>Cancel</button>}
            </div>
          </form>
        </Panel>

        <Panel title="Test Nova">
          <form
            className="adm-chat-test"
            onSubmit={(event) => {
              event.preventDefault();
              if (question.trim()) setReply(respond(question));
            }}
          >
            <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question as a visitor would…" aria-label="Test question" />
            <button type="submit" className="adm-btn adm-btn-primary" aria-label="Ask"><Send size={16} /></button>
          </form>
          {reply ? (
            <div className="adm-chat-reply">
              <span className="adm-badge info">{reply.source}</span>
              <p><Bot size={16} /> {reply.text}</p>
              {reply.items?.length > 0 && <small>Suggests: {reply.items.map((item) => item.title).join(", ")}</small>}
              {reply.links?.length > 0 && <small>Links: {reply.links.map((link) => `${link.label} (${link.to})`).join(", ")}</small>}
            </div>
          ) : (
            <p className="adm-muted">Type a question to see which rule answers it.</p>
          )}
        </Panel>
      </div>

      <Panel title={`Your answers (${faqs.length})`}>
        {faqs.length ? (
          <ul className="adm-faqs">
            {faqs.map((faq) => (
              <li key={faq.id}>
                <div>
                  <div className="adm-badges">{faq.keywords.map((word) => <span key={word} className="adm-chip">{word}</span>)}</div>
                  <p>{faq.answer}</p>
                  {faq.links && <small>→ {faq.links[0].label} ({faq.links[0].to})</small>}
                </div>
                <div className="adm-row-actions">
                  <button type="button" className="adm-icon-btn" onClick={() => edit(faq)} aria-label="Edit answer"><Pencil size={16} /></button>
                  <button type="button" className="adm-icon-btn danger" onClick={() => deleteFaq(faq.id)} aria-label="Delete answer"><Trash2 size={16} /></button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon={Bot} title="No custom answers yet">
            <p>Add one above — it will be used by the chatbot on every page.</p>
          </EmptyState>
        )}
      </Panel>

      <Panel title={`Built-in knowledge base (${knowledge.intents.length} topics)`}>
        <ul className="adm-faqs adm-faqs-readonly">
          {knowledge.intents.map((intent) => (
            <li key={intent.id}>
              <div>
                <div className="adm-badges">{intent.keywords.slice(0, 5).map((word) => <span key={word} className="adm-chip">{word}</span>)}</div>
                <p>{intent.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
