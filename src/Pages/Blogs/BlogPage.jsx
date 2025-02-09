import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "@/api/axios";
import trainerImg from "../../assets/trainers.jpg"; // Assuming the image path is correct

export const BlogPost = ({ title, date, description, image_url, slug }) => {
  return (
    <div className="bg-black rounded-lg overflow-hidden border border-gray-900 transition-transform duration-300 hover:-translate-y-2 shadow-lg shadow-gray-800">
      {/* Fixed Image Height */}
      <img
        src={image_url || "https://via.placeholder.com/400"}
        alt="Blog post"
        className="w-full h-64 object-cover"
      />
      
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
        {new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}

        </div>
        <h2 className="text-2xl font-normal mb-4 text-primary transition-colors">{title}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 text-justify line-clamp-3">{description}</p> {/* Shows only 3 lines */}

        {/* Read More - Uses slug in the route */}
     
        <Link to={`/blog/${slug}`} className=" text-sm hover:underline text-gray-400">
          Read More
        </Link>
      </div>
    </div>
  );
};

const BlogLayout = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await apiRequest("blog-table", "GET"); // Fetch blog posts
      setPosts(data);
    } catch (error) {
      setError("Error fetching blogs. Please try again later.");
      console.error("Error fetching blogs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src={trainerImg} alt="Gym background" className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-6 text-5xl font-bold tracking-wider">
            OUR <span className="text-primary">BLOGS</span>
          </h1>
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link>
            <span>›</span>
            <span className="text-primary">Blogs</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-10">
        {loading ? (
          <p className="text-center text-white">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-white">{error}</p>
        ) : (
          posts.map((post) => (
            <BlogPost
              key={post.id}
              title={post.title}
              date={post.created_at}
              description={post.content}
              image_url={post.image_url}
              slug={post.slug}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogLayout;
