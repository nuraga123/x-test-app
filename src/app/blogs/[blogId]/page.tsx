import { BlogComponent } from "@/components/Blog";
import { getBlogById } from "@/utils/blogs";

type PageProps = {
  params: Promise<{ blogId: number }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

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

export default async function BlogsId({ params }: PageProps) {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);
  return <BlogComponent {...blog} />;
}
