export type AICategory =
  | "chat"
  | "image"
  | "code"
  | "research"
  | "audio"
  | "productivity";

export type ServiceStatus = "online" | "beta" | "offline";

export interface AIService {
  id: string;
  name: string;
  description: string;
  category: AICategory;
  url: string;
  icon: string; // Lucide icon name
  status: ServiceStatus;
  tags: string[];
  featured?: boolean;
}

export interface TransitLine {
  id: string;
  category: AICategory;
  stations: string[]; // service IDs
  strokeWidth: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface StationPosition {
  id: string;
  position: Position;
  angle: number; // radians from hub
}
