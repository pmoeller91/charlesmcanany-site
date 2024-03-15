import { slug } from "github-slugger";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import stripMarkdown from "strip-markdown";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";

// slugify
export const slugify = (content: string) => {
  return slug(content);
};

// markdownify
export const markdownify = (content: string, sanitize = false) => {
  const markdownContent = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw);
  if (sanitize) {
    const sanitizedContent = markdownContent
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .processSync(content)
      .toString();
    return { __html: sanitizedContent };
  }
  const unsanitizedContent = markdownContent
    .use(rehypeStringify)
    .processSync(content);
  return { __html: unsanitizedContent.toString() };
};

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  const plainText = unified()
    .use(remarkParse)
    .use(stripMarkdown)
    .use(remarkStringify)
    .processSync(content);
  return plainText.toString();
};
