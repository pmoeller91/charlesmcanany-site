import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

const contentPath = "src/content";

// Helper function to read file content
const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
};

// Helper function to parse frontmatter
const parseFrontmatter = (frontmatter: any) => {
  const frontmatterString = JSON.stringify(frontmatter);
  return JSON.parse(frontmatterString);
};

// get list page data, ex: _index.md
export const getListPage = (filePath: string) => {
  const pageDataPath = path.join(contentPath, filePath);

  if (!fs.existsSync(pageDataPath)) {
    notFound();
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);

  return {
    frontmatter: parseFrontmatter(frontmatter),
    content,
  };
};
