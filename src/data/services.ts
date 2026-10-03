import type { AIService, TransitLine } from "../types";

export const SERVICES: AIService[] = [
  // ── Chat ──
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's frontier AI for reasoning, coding, and creative work.",
    category: "chat",
    url: "https://claude.ai",
    icon: "MessageSquare",
    status: "online",
    tags: ["reasoning", "code"],
    featured: true,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's general-purpose conversational assistant.",
    category: "chat",
    url: "https://chat.openai.com",
    icon: "Sparkles",
    status: "online",
    tags: ["general", "multimodal"],
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's multimodal model with deep ecosystem integration.",
    category: "chat",
    url: "https://gemini.google.com",
    icon: "Zap",
    status: "online",
    tags: ["multimodal", "google"],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "Open-weight LLM with exceptional reasoning capabilities.",
    category: "chat",
    url: "https://chat.deepseek.com",
    icon: "BrainCircuit",
    status: "online",
    tags: ["reasoning", "open-source"],
  },

  // ── Image ──
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Generative image model with unparalleled aesthetic quality.",
    category: "image",
    url: "https://www.midjourney.com",
    icon: "Image",
    status: "online",
    tags: ["generation", "aesthetic"],
  },
  {
    id: "dalle",
    name: "DALL·E",
    description: "OpenAI's image generation with precise prompt adherence.",
    category: "image",
    url: "https://openai.com/dall-e-3",
    icon: "Palette",
    status: "online",
    tags: ["generation", "openai"],
  },

  // ── Code ──
  {
    id: "copilot",
    name: "GitHub Copilot",
    description: "AI pair programmer deeply integrated into the development flow.",
    category: "code",
    url: "https://github.com/features/copilot",
    icon: "Code",
    status: "online",
    tags: ["completion", "ide"],
    featured: true,
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-first code editor built on VS Code with agentic capabilities.",
    category: "code",
    url: "https://cursor.sh",
    icon: "Terminal",
    status: "online",
    tags: ["editor", "agentic"],
  },
  {
    id: "v0",
    name: "v0",
    description: "Vercel's generative UI tool for building React components from text.",
    category: "code",
    url: "https://v0.dev",
    icon: "Layout",
    status: "online",
    tags: ["frontend", "generation"],
  },

  // ── Research ──
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI-powered search engine with real-time citation and deep research.",
    category: "research",
    url: "https://www.perplexity.ai",
    icon: "Search",
    status: "online",
    tags: ["search", "citations"],
    featured: true,
  },
  {
    id: "consensus",
    name: "Consensus",
    description: "AI research assistant that searches across academic papers.",
    category: "research",
    url: "https://consensus.app",
    icon: "BookOpen",
    status: "online",
    tags: ["academic", "papers"],
  },

  // ── Audio ──
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "State-of-the-art voice synthesis and voice cloning platform.",
    category: "audio",
    url: "https://elevenlabs.io",
    icon: "Mic",
    status: "online",
    tags: ["tts", "voice-cloning"],
  },
  {
    id: "suno",
    name: "Suno",
    description: "AI music generation from text prompts with full song structure.",
    category: "audio",
    url: "https://suno.ai",
    icon: "Music",
    status: "online",
    tags: ["music", "generation"],
  },

  // ── Productivity ──
  {
    id: "notion-ai",
    name: "Notion AI",
    description: "Integrated AI writing and Q&A inside the Notion workspace.",
    category: "productivity",
    url: "https://www.notion.so/product/ai",
    icon: "FileText",
    status: "online",
    tags: ["writing", "workspace"],
  },
  {
    id: "granola",
    name: "Granola",
    description: "AI meeting assistant that transcribes, summarizes, and extracts action items.",
    category: "productivity",
    url: "https://www.granola.ai",
    icon: "Headphones",
    status: "beta",
    tags: ["meetings", "transcription"],
  },
];

export const TRANSIT_LINES: TransitLine[] = [
  {
    id: "line-chat",
    category: "chat",
    stations: ["claude", "chatgpt", "gemini", "deepseek"],
    strokeWidth: 1,
  },
  {
    id: "line-image",
    category: "image",
    stations: ["midjourney", "dalle"],
    strokeWidth: 1,
  },
  {
    id: "line-code",
    category: "code",
    stations: ["copilot", "cursor", "v0"],
    strokeWidth: 1,
  },
  {
    id: "line-research",
    category: "research",
    stations: ["perplexity", "consensus"],
    strokeWidth: 1,
  },
  {
    id: "line-audio",
    category: "audio",
    stations: ["elevenlabs", "suno"],
    strokeWidth: 1,
  },
  {
    id: "line-productivity",
    category: "productivity",
    stations: ["notion-ai", "granola"],
    strokeWidth: 1,
  },
];

export const CATEGORY_META: Record<
  string,
  { label: string; labelZh: string }
> = {
  chat: { label: "Conversation", labelZh: "对话" },
  image: { label: "Image", labelZh: "图像" },
  code: { label: "Code", labelZh: "代码" },
  research: { label: "Research", labelZh: "研究" },
  audio: { label: "Audio", labelZh: "音频" },
  productivity: { label: "Productivity", labelZh: "生产力" },
};
