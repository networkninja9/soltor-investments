"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { investmentGuides } from "../investment-guides/data";
import "./InvestmentAssistant.css";

type AssistantLink = {
  href: string;
  label: string;
  category?: string;
  description?: string;
  pdfHref?: string;
};

type ChatMessage = {
  id: number;
  author: "assistant" | "visitor";
  text: string;
  links?: AssistantLink[];
};

type AssistantReply = Omit<ChatMessage, "id" | "author">;

const suggestedQuestions = [
  "What risks should I consider?",
  "Are any opportunities available?",
  "Show me the investment overviews",
  "How do I contact Soltor Capital?"
];

function getGuideCard(guide: (typeof investmentGuides)[number]): AssistantLink {
  return {
    href: `/investment-guides/${guide.slug}`,
    label: guide.title,
    category: guide.category,
    description: guide.subtitle,
    pdfHref: `/investment-guides/${guide.slug}.pdf`
  };
}

function getCategoryFromQuestion(
  question: string,
  currentGuide: (typeof investmentGuides)[number] | undefined
) {
  if (/(airport|airports|aviation|runway|hangar)/.test(question)) {
    return investmentGuides.find(({ slug }) => slug === "private-airports");
  }
  if (/(estate|estates|mansion|residence|private propert)/.test(question)) {
    return investmentGuides.find(({ slug }) => slug === "private-estates");
  }
  if (/(development|construction|real estate)/.test(question)) {
    return investmentGuides.find(({ slug }) => slug === "real-estate-development");
  }
  if (/\bland\b|\blots?\b|\bzoning\b/.test(question)) {
    return investmentGuides.find(({ slug }) => slug === "land");
  }

  return currentGuide;
}

function getAssistantReply(
  rawQuestion: string,
  currentGuide: (typeof investmentGuides)[number] | undefined
): AssistantReply {
  const question = rawQuestion.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, " ").trim();
  const category = getCategoryFromQuestion(question, currentGuide);
  const allGuideLinks = investmentGuides.map(getGuideCard);
  const safetyNote =
    "I can share general information from the website, but I can’t give personal investment advice, promise returns, or assess whether an investment is right for you.";

  if (/^(hi|hello|hey|good morning|good afternoon)\b/.test(question)) {
    return {
      text: "Hello. I can help you explore Soltor Capital’s investment areas, published overviews, and general due-diligence topics. What would you like to know?"
    };
  }

  if (/(passport|identity document|bank account|password|social security|account number|financial details|personal information|private information)/.test(question)) {
    return {
      text: "Please don’t share identity documents, bank details, passwords, account numbers, or confidential financial information here or by email. This assistant cannot securely handle sensitive information."
    };
  }

  if (/(should i invest|tell me to invest|personal advice|investment advice|recommend(ation)?|guarantee|risk.free|guaranteed|expected returns?|rate of return)/.test(question)) {
    return { text: safetyNote };
  }

  if (/(available|availability|current offering|active offering|open investment|invest now|investment opportunity|opportunities|live deals|current deal)/.test(question)) {
    return {
      text: "The website describes areas of interest, not confirmed or currently available investments. I can’t verify live opportunities, eligibility, or terms. For general enquiries or professional introductions, contact the team directly.",
      links: [{ href: "mailto:kng@soltorcapital.com", label: "Contact Soltor Capital" }]
    };
  }

  if (/(contact|email|speak to|talk to|reach|introduction)/.test(question)) {
    return {
      text: "For general enquiries and professional introductions, email the Soltor Capital team. Please don’t include confidential financial, account, or identity information.",
      links: [{ href: "mailto:kng@soltorcapital.com", label: "kng@soltorcapital.com" }]
    };
  }

  if (/(risk|downside|lose|loss|illiquid)/.test(question)) {
    if (category) {
      return {
        text: `${category.title} can involve the loss of capital and may be illiquid. Review these category-specific risks before considering an opportunity:\n${category.keyRisks.map((risk) => `• ${risk}`).join("\n")}`,
        links: [getGuideCard(category)]
      };
    }

    return {
      text: "Risks depend on the asset and its structure. These investments may lose value, be illiquid, require additional capital, or be affected by legal, regulatory, environmental, operating, construction, or market conditions. Review the specific category and seek advice from appropriately qualified advisers.",
      links: allGuideLinks
    };
  }

  if (/(due diligence|diligence|what to check|what should i check|questions to ask|before investing|documents to review)/.test(question)) {
    if (category) {
      return {
        text: `${category.title} due diligence should be tailored to the asset, its jurisdiction, ownership, permissions, condition, operating plan, and financial assumptions. Start with these questions:\n${category.diligenceQuestions.map((item, index) => `${index + 1}. ${item}`).join("\n")}`,
        links: [getGuideCard(category)]
      };
    }

    return {
      text: "Due diligence is specific to each asset. The overviews include category-specific questions on ownership, regulatory approvals, independent inspections, financial assumptions, and risks. An independent legal, technical, and financial review is important.",
      links: allGuideLinks
    };
  }

  if (/(pdf|download|document|overview|brief|guide)/.test(question)) {
    if (/(all|every|each|four|categories|investment areas|areas of focus|overviews|guides)/.test(question)) {
      return {
        text: "Choose an investment area to read its overview online or open the embedded PDF.",
        links: allGuideLinks
      };
    }

    if (category) {
      return {
        text: `The ${category.title} overview is available to read online, with its PDF embedded on the page.`,
        links: [getGuideCard(category)]
      };
    }

    return {
      text: "Choose an investment area to read its overview online or open the embedded PDF.",
      links: allGuideLinks
    };
  }

  if (category) {
    return {
      text: `${category.overview}\n\n${safetyNote}`,
      links: [getGuideCard(category)]
    };
  }

  return {
    text: "I can help with Soltor Capital’s published investment overviews, general risk considerations, and due diligence. I can’t confirm live offerings or give investment advice. Select a guide or contact the team for general enquiries.",
    links: allGuideLinks.concat({
      href: "mailto:kng@soltorcapital.com",
      label: "Contact Soltor Capital"
    })
  };
}

export default function InvestmentAssistant() {
  const pathname = usePathname();
  const currentGuide = investmentGuides.find(
    ({ slug }) => pathname === `/investment-guides/${slug}`
  );
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      author: "assistant",
      text: "Welcome. I can help you explore our investment areas and published guides. What would you like to know?"
    }
  ]);
  const nextId = useRef(1);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();

    if (!question) {
      return;
    }

    const reply = getAssistantReply(question, currentGuide);
    const visitorMessage: ChatMessage = {
      id: nextId.current++,
      author: "visitor",
      text: question
    };
    const assistantMessage: ChatMessage = {
      id: nextId.current++,
      author: "assistant",
      ...reply
    };

    setMessages((previous) => previous.concat(visitorMessage, assistantMessage));
    setDraft("");
  }

  function askSuggestedQuestion(question: string) {
    const reply = getAssistantReply(question, currentGuide);

    setMessages((previous) =>
      previous.concat(
        { id: nextId.current++, author: "visitor", text: question },
        { id: nextId.current++, author: "assistant", ...reply }
      )
    );
  }

  return (
    <div className="investment-assistant" id="site-assistant">
      {isOpen && (
        <section
          className="investment-assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="investment-assistant-title"
        >
          <header className="investment-assistant-header">
            <div className="investment-assistant-identity">
              <span className="investment-assistant-mark" aria-hidden="true">S</span>
              <div>
                <h2 id="investment-assistant-title">Soltor assistant</h2>
                <p><span /> Website guide · Not investment advice</p>
              </div>
            </div>
            <button
              className="investment-assistant-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              ×
            </button>
          </header>

          <div
            className="investment-assistant-messages"
            ref={messagesRef}
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <article
                className={`investment-assistant-message investment-assistant-message-${message.author}${message.links?.some((link) => link.category) ? " investment-assistant-message-guides" : ""}`}
                key={message.id}
              >
                <p>{message.text}</p>
                {message.links && (
                  <div className="investment-assistant-links">
                    {message.links.map((link) => link.category ? (
                      <article className="investment-assistant-guide-card" key={link.href}>
                        <div className="investment-assistant-guide-category">{link.category}</div>
                        <h3>{link.label}</h3>
                        <p>{link.description}</p>
                        <div className="investment-assistant-guide-actions">
                          <a className="investment-assistant-guide-read" href={link.href}>
                            Read overview <span aria-hidden="true">↗</span>
                          </a>
                          {link.pdfHref && (
                            <a className="investment-assistant-guide-download" download href={link.pdfHref}>
                              PDF <span aria-hidden="true">↓</span>
                            </a>
                          )}
                        </div>
                      </article>
                    ) : (
                      <a className="investment-assistant-link" href={link.href} key={link.href}>
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
            {messages.length === 1 && (
              <div className="investment-assistant-suggestions" aria-label="Suggested questions">
                {suggestedQuestions.map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() => askSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="investment-assistant-form" onSubmit={submitQuestion}>
            <label className="investment-assistant-visually-hidden" htmlFor="investment-assistant-input">
              Ask a question about Soltor Capital’s investment guides
            </label>
            <input
              autoComplete="off"
              id="investment-assistant-input"
              maxLength={500}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about investment areas…"
              ref={inputRef}
              type="text"
              value={draft}
            />
            <button type="submit" disabled={!draft.trim()} aria-label="Send question">
              ↑
            </button>
          </form>

          <p className="investment-assistant-privacy">
            General information only. Don’t share confidential or personal details.
          </p>
        </section>
      )}

      <button
        className="investment-assistant-toggle"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Soltor assistant" : "Chat with Soltor assistant"}
      >
        {isOpen ? <span aria-hidden="true">×</span> : <><span className="investment-assistant-toggle-icon" aria-hidden="true">S</span><span>Ask Soltor</span></>}
      </button>
    </div>
  );
}
