import { BlogComponent } from "@/components/Blog";
import { getBlogById } from "@/utils/blogs";

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getBlogById(+params.blogId);

  if (!blog.id) {
    return {
      title: "Bloq tapılmadı",
      description: "Bloq tapılmadı",
    };
  }

  return {
    title: blog.title,
    description: blog.title,
  };
}

export default async function BlogsId({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getBlogById(+params.blogId);
  return <BlogComponent {...blog} />;
}
