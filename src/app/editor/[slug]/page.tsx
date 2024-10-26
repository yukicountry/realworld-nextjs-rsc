import { UpdateArticleEditor } from "@/modules/features/article/components/articleEditor";
import { fetchArticle } from "@/modules/features/article/fetch/fetchArticle";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const Page = ({ params }: Props) => {
  const article = fetchArticle(params.slug);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Suspense fallback={<p>⌛Loading...</p>}>
              <UpdateArticleEditor defaultValues={article} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
