import ImageFallback from "@/src/layouts/helpers/ImageFallback";
import { MDContent } from "@/src/layouts/helpers/MDContent";
import { getListPage } from "@/src/lib/contentParser";
import { markdownify } from "@/src/lib/utils/textConverter";
import SeoMeta from "@/src/layouts/partials/SeoMeta";
import { RegularPage } from "@/src/types";

const HomePage = () => {
  const data: RegularPage = getListPage("homepage/_index.md");
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
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              {image && (
                <ImageFallback
                  className="mx-auto mb-6 rounded-lg"
                  src={image}
                  width={200}
                  height={200}
                  alt={title}
                />
              )}
              <h2
                dangerouslySetInnerHTML={markdownify(title)}
                className="h3 mb-6"
              />
              <div className="content">
                <MDContent content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
