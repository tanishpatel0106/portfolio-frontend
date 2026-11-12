// Tiny markdown renderer for assistant replies: bold, italics, inline code,
// code blocks, links and lists. Input is escaped first, so model output can
// never inject markup; links are limited to http(s) and same-site paths.

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const safeHref = (href: string) => (/^(https?:\/\/|\/(?!\/))/i.test(href) ? href : "#");

export function renderMarkdown(text: string): string {
  let html = escapeHtml(text)
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="my-3 overflow-x-auto rounded-lg border bg-neutral-950 p-3 font-mono text-xs leading-relaxed text-neutral-100"><code>$2</code></pre>'
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">$1</code>'
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
      const url = safeHref(href.replace(/&amp;/g, "&"));
      const external = url.startsWith("http");
      return `<a href="${escapeHtml(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""} class="font-medium text-brand underline underline-offset-2">${label}</a>`;
    })
    .replace(/^#{1,6}\s+(.+)$/gm, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/^[ \t]*[-*]\s+(.+)/gm, '<li class="ml-5 list-disc">$1</li>')
    .replace(/^[ \t]*\d+\.\s+(.+)/gm, '<li class="ml-5 list-decimal">$1</li>')
    .replace(/\n\n+/g, '</p><p class="mt-3">')
    .replace(/\n/g, "<br/>");

  html = html.replace(
    /(<li[^>]*>.*?<\/li>(?:\s*<br\/>\s*)?)+/g,
    (match) => `<ul class="my-2 space-y-1">${match.replace(/<br\/>/g, "")}</ul>`
  );
  return `<p>${html}</p>`;
}
