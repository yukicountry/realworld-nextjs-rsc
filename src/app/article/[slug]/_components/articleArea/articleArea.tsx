import { Button } from "@/modules/common/components/button";
import { DeleteArticleButton } from "@/modules/features/article/components/deleteArticleButton";
import { FavoriteButton } from "@/modules/features/article/components/favoriteButton";
import { Tag } from "@/modules/features/article/components/tag";
import { fetchArticle } from "@/modules/features/article/fetch/fetchArticle";
import { FollowButton } from "@/modules/features/profile/components/followButton";
import { Article } from "@/utils/types/models";
import Link from "next/link";
import { ReactNode } from "react";

const Actions = ({ article }: { article: Article }) => {
  const profile = article.author;

  return (
    <div className="article-meta">
      <Link href={`/profile/${profile.username}`}>{profile.image && <img src={profile.image} alt="" />}</Link>
      <div className="info">
        <Link href={`/profile/${profile.username}`} className="author">
          {profile.username}
        </Link>
        <span className="date">{article.createdAt.toDateString()}</span>
      </div>
      <FollowButton {...profile} />
      <FavoriteButton {...article} showMessage={true} />
      <Button component="a" href={`/editor/${article.slug}`} color="secondary">
        <i className="ion-edit"></i> Edit Article
      </Button>
      <DeleteArticleButton slug={article.slug} />
    </div>
  );
};

export const ArticleArea = async ({ slug, children }: { slug: string; children: ReactNode }) => {
  const article = await fetchArticle(slug);

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <Actions article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
            <ul className="tag-list">
              {article.tagList.map((tag, index) => (
                <Tag as="li" variant="outline" key={index}>
                  {tag}
                </Tag>
              ))}
            </ul>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <Actions article={article} />
        </div>
        {children}
      </div>
    </div>
  );
};
