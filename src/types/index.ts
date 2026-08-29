/**
 * Global TypeScript Type Definitions
 */

// Common types
export type ValueOf<T> = T[keyof T];

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncFunction<T = void> = () => Promise<T>;

// UI Component Props
export type BaseComponentProps = {
  className?: string;
  children?: React.ReactNode;
};

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

// Animation types
export type AnimationDirection = "up" | "down" | "left" | "right";

export type AnimationDuration = "fast" | "normal" | "slow";

// API Response types
export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

export type ApiError = {
  status: number;
  message: string;
  code?: string;
};

// SEO and Metadata
export type PageMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
};

// Accessibility
export type AriaLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type AriaRole =
  | "button"
  | "link"
  | "menuitem"
  | "tab"
  | "navigation"
  | "main"
  | "region";
