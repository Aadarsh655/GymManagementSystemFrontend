import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "@/api/axios";
import { motion } from "framer-motion";
import { BlogPost } from "./BlogPage";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
        const fetchData = async () => {
          try {
            const [blogData, relatedData] = await Promise.all([
              apiRequest(`blog/${slug}`, "GET"),
              apiRequest("blog-table", "GET")
            ]);
            setBlog(blogData);
            // Filter out current blog and get related posts
            setRelatedPosts(
              relatedData.filter(post => post.slug !== slug)
            );
          } catch (error) {
            setError("Error fetching content. Please try again later.");
            console.error("Error:", error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!blog) return <ErrorMessage message="Blog not found." />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white px-6 py-12 lg:px-24"
    >
        <div className="flex gap-x-12">
      <div className="max-w-4xl mt-10 mx-auto">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-4xl sm:text-4xl font-bold text-primary mb-6 leading-tight"
        >
          {blog.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-xl mb-6"
        >
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          className="mb-8 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={blog.image_url || "/placeholder.svg"}
            className="w-full max-h-[400px] object-cover rounded-xl"
            alt={blog.title}
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="prose prose-invert max-w-none text-lg leading-7 text-justify"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Related Posts Section */}
      <div className="mt-12">
        <div className="sticky top-4 space-y-6">
          <h2 className="text-2xl font-bold">Related Posts</h2>
          <div className="grid gap-6 grid-cols-2">
            {relatedPosts?.map((post) => (
              <BlogPost
                key={post.id}
                title={post.title}
                date={post.created_at}
                description={post.content}
                image_url={post.image_url}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-zinc-900 to-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-zinc-900 to-black">
    <p className="text-white text-xl">{message}</p>
  </div>
);

export default BlogDetail;


