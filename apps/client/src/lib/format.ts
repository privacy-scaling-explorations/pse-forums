export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export enum Format {
  Markdown = "markdown",
  Latex = "latex",
  Raw = "raw",
}

export function detectFormat(text: string) {
  if (/\$\$[\s\S]*?\$\$/.test(text) || /\$[^$]+\$/.test(text)) {
    return Format.Latex
  }

  if (/(^#{1,6} |\*\*|__|`{1,3}|\[.*?\]\(.*?\)|\*|-)/m.test(text)) {
    return Format.Markdown
  }

  return Format.Raw
}
