import { MDContent } from "@/src/components/helpers/MDContent";
import { getSinglePage } from "@/src/lib/contentParser";
import PageHeader from "@/src/components/partials/PageHeader";
import SeoMeta from "@/src/components/partials/SeoMeta";
import { RegularPage } from "@/src/types/RegularPage";
import { notFound } from "next/navigation";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const getRegularPages = getSinglePage("pages");

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));

  return regularPages;
};

// for all regular pages
const RegularPages = ({ params }: { params: { regular: string } }) => {
  const regularData = getSinglePage("pages");
  const data = regularData.find(
    (page: RegularPage) => page.slug === params.regular,
  );
  if (!data) {
    notFound();
  }
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section">
        <div className="container">
          <div className="content">
            <MDContent content={content} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegularPages;
