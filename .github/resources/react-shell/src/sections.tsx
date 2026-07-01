import type { ReactNode } from "react";

export interface Section {
  title: string;
  label?: string;
  variant?: "hero" | "accent" | "dark" | "default" | "break";
  body: ReactNode;
}

// Navigation sections displayed in the top breadcrumb bar.
// Each section's `id` should match the `label` field on the first slide in that section.
export const NAV_SECTIONS: { id: string; long: string }[] = [];

// Skill-generated content goes here.
// Run create-react-presentation to populate this file from your spec.
export const sections: Section[] = [];
