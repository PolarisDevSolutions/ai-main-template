/**
 * Renders CMS rich-text content (HTML from Tiptap) as real HTML.
 *
 * Usage:
 *   <RichText html={faq.answer} className="text-white" />
 *
 * If the value is plain text (no tags) it still renders correctly.
 * Accepts the same props as a <div> so you can pass className, style, etc.
 */

import type { HTMLAttributes } from "react";

interface RichTextProps extends HTMLAttributes<HTMLDivElement> {
  /** The HTML string from the CMS / Tiptap editor */
  html: string | undefined | null;
  /** Render as a <span> instead of a <div> (for inline contexts) */
  inline?: boolean;
}

export default function RichText({
  html,
  inline = false,
  ...rest
}: RichTextProps) {
  if (!html) return null;

  const Tag = inline ? "span" : "div";

  return (
    <Tag
      {...rest}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
