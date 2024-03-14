import BlogCard from "@/src/layouts/components/BlogCard";
import config from "@/src/config/config.json";
import { getSinglePage } from "@/src/lib/contentParser";
import { getTaxonomy } from "@/src/lib/taxonomyParser";
import taxonomyFilter from "@/src/lib/utils/taxonomyFilter";
import { humanize } from "@/src/lib/utils/textConverter";
import PageHeader from "@/src/layouts/partials/PageHeader";
import SeoMeta from "@/src/layouts/partials/SeoMeta";
import { Post } from "@/src/types";

const { blog_folder } = config.settings;
type StaticParams = () => { single: string }[];

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: StaticParams = () => {
  const categories = getTaxonomy(blog_folder, "categories");

  const paths = categories.map((category) => ({
    single: category,
  }));

  return paths;
};

const CategorySingle = ({ params }: { params: { single: string } }) => {
  const posts: Post[] = getSinglePage(blog_folder);
  const filterByCategories = taxonomyFilter(posts, "categories", params.single);

  return (
    <>
      <SeoMeta title={humanize(params.single)} />
      <PageHeader title={humanize(params.single)} />
      <div className="section-sm pb-0">
        <div className="container">
          <div className="row">
            {filterByCategories.map((post: Post, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <BlogCard data={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySingle;
