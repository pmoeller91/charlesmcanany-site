import { markdownify } from "@/src/lib/utils/textConverter";

export interface MDContentProps {
  content: string;
  wrappingElement?: keyof HTMLElementTagNameMap;
}

export function MDContent({ content, wrappingElement }: MDContentProps) {
  const WrappingElement = wrappingElement ?? "div";
  return <WrappingElement dangerouslySetInnerHTML={markdownify(content)} />;
}
