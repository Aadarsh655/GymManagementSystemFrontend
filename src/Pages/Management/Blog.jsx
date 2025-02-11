import { AddButton } from "@/components/UI/Button";
import { useState, useEffect } from "react";
import Search from "@/layouts/Search";
import DataTable from "@/components/data-table/DataTable";
import apiRequest from "@/api/axios";
import UserRegistrationForm from "./UserRegistration";
import { CirclePlus, FilePenLine, Trash2, Archive } from "lucide-react";
import { ActionButtons } from "../../components/UI/Button";

export default function Blog(){
    const [selectedRow, setSelectedRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const[searchQuery,setSearchQuery]=useState('')
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await apiRequest("blog-table", "GET");
            setData(response); 
        } catch (err) {
            console.error("Failed to fetch users:", err.message);
            setError("Failed to load user data.");
        } finally {
            setLoading(false);
        }
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
      };
    
      const filteredData = searchQuery
      ? data.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
          )
      : data;
    useEffect(() => {
        fetchBlogs();
    }, []);
    const handleSubmit = async (formData, setError, setIsModalOpen) => {
        try {
            let formDataToSend = new FormData();
            
            for (let key in formData) {
                if (formData[key] instanceof File || typeof formData[key] === "object") {
                    formDataToSend.append("image", formData[key]);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
    
            let response;
    
            if (selectedRow?.id) {  
                response = await apiRequest(`blog/${selectedRow.id}`, "PATCH", formDataToSend);
                toast.success("Blog edited successfully!")
            } else {
                response = await apiRequest("blog", "POST", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Blog created successfully!")
            }
    
            console.log("API Response:", response);
            setError(null);
            setIsModalOpen(false);
            setSelectedRow(null);
    
            setTimeout(() => {
                fetchBlogs();
            }, 500);
    
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred.");
        }
    };
    
    const handleAdd = () => {
        setSelectedRow(null);
        setIsModalOpen(true);
    };

    const handleEdit = () => {
        if (!selectedRow) {
            toast.warning("Please select a row to edit.");
            return;
        }

        const formattedRow = {
            id: selectedRow.id,
            title: selectedRow.title,
            content:selectedRow.content,
            slug:selectedRow.slug,
            image:selectedRow.image,
        };

        console.log("Formatted Row for Editing:", formattedRow);
        setSelectedRow(formattedRow);
        setIsModalOpen(true);
    };


    const formFields=    [   {
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Enter the blog title',
        required: true,
    },
    {
        name: 'image',
        label: 'Image',
        type: 'file',
        image: 'image',
        accept: 'image/*',
    },
    {
        name:'content',
        label: 'Content',
        type: 'textarea',
        placeholder: 'Enter the Description',
        required: true,
    },
    ]
    const columns = [
        {accessorKey: "id",header: "Blog ID.",},
        {accessorKey: "image",header: "Image",enableSorting: false,
            cell: (info) => (
                <img
                    src={info.row.original.image_url || "/default-avatar.png"} 
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
            ),
        },
        {accessorKey: "title",header: "Title",},
        {accessorKey: "content",header: "Description",
            cell: (info) => {
                const description = info.getValue(); 
                const truncated = description.split(" ").slice(0, 4).join(" ") + "........"; 
                return <span>{truncated}</span>;
            },
        },
        {accessorKey: "slug",header: "Slug",},
    ];
    return(
        <div className="h-screen">
            <div className="flex mt-3">

            <h1 className="text-2xl w-full sticky mt-4 font-semibold px-2 mb-4">Blogs</h1>
            <ActionButtons
        actions={[
            { onClick: handleAdd, icon: CirclePlus, text: "ADD" },
            {  onClick: handleEdit,icon: FilePenLine, text: "EDIT" },
            {  icon: Trash2, text: "DELETE" },
            {  icon: Archive, text: "ARCHIVE" }
            ]}
        />
            </div>
            <Search onSearch={handleSearch}/> 
                    {loading ? (
                      <p>Loading...</p>
                    ) : error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      <DataTable columns={columns} data={filteredData} setSelectedRow={setSelectedRow}/>
                    )}
                            {isModalOpen && (
          <UserRegistrationForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            formFields={formFields}
            initialValues={selectedRow}
            apiEndpoint= "blog"
            handleSubmit={handleSubmit}
          />
        )}
   
        </div>
    )}


// import { AddButton } from "@/components/UI/Button";
// import { useState, useEffect } from "react";
// import Search from "@/layouts/Search";
// import DataTable from "@/components/data-table/DataTable";
// import apiRequest from "@/api/axios";
// import UserRegistrationForm from "./UserRegistration";
// import { CirclePlus, FilePenLine, Trash2, Archive } from "lucide-react";
// import { ActionButtons } from "../../components/UI/Button";

// export default function Blog() {
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   // Fetch blogs
//   const fetchBlogs = async () => {
//     setLoading(true);
//     try {
//       const response = await apiRequest("blog-table", "GET");
//       setData(response); // Set the blog data after fetching
//     } catch (err) {
//       console.error("Failed to fetch blogs:", err.message);
//       setError("Failed to load blog data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch blogs on component mount
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Handle form submission (for both adding and editing blogs)
//   const handleSubmit = async (formData, setError, setIsModalOpen) => {
//     try {
//       let formDataToSend = new FormData();
  
//       // Append form data (make sure to check if it's not null or undefined)
//       for (let key in formData) {
//         if (formData[key] !== null && formData[key] !== undefined) {
//           if (formData[key] instanceof File) {
//             formDataToSend.append(key, formData[key]);
//           } else if (typeof formData[key] === "object" && !(formData[key] instanceof File)) {
//             formDataToSend.append(key, JSON.stringify(formData[key]));
//           } else {
//             formDataToSend.append(key, formData[key]);
//           }
//         }
//       }
  
//       console.log("FormData to Send:", formDataToSend); // Check if formDataToSend is populated correctly.
  
//       let response;
//       if (selectedRow?.id) {
//         response = await apiRequest(`blog/${selectedRow.id}`, "PATCH", formDataToSend);
//       } else {
//         response = await apiRequest("blog", "POST", formDataToSend, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//       }
  
//       console.log("API Response:", response);
  
//       setError(null);
//       setIsModalOpen(false);
//       setSelectedRow(null);
  
//       setTimeout(() => {
//         fetchBlogs();
//       }, 500);
  
//     } catch (error) {
//       setError(error.response?.data?.message || "An error occurred.");
//     }
//   };
  

//   // Handle adding a new blog
//   const handleAdd = () => {
//     setSelectedRow(null);
//     setIsModalOpen(true);
//   };

//   // Handle editing an existing blog
//   const handleEdit = () => {
//     if (!selectedRow) {
//       alert("Please select a row to edit.");
//       return;
//     }

//     const formattedRow = {
//       id: selectedRow.id,
//       title: selectedRow.title,
//       content: selectedRow.content,
//       slug: selectedRow.slug,
//       image: selectedRow.image,
//     };

//     console.log("Formatted Row for Editing:", formattedRow);
//     setSelectedRow(formattedRow);
//     setIsModalOpen(true);
//   };

//   const formFields = [
//     {
//       name: "title",
//       label: "Title",
//       type: "text",
//       placeholder: "Enter the blog title",
//       required: true,
//     },
//     {
//       name: "image",
//       label: "Image",
//       type: "file",
//       accept: "image/*",
//     },
//     {
//       name: "content",
//       label: "Content",
//       type: "textarea",
//       placeholder: "Enter the Description",
//       required: true,
//     },
//   ];

//   const columns = [
//     { accessorKey: "id", header: "Blog ID." },
//     {
//       accessorKey: "image",
//       header: "Image",
//       enableSorting: false,
//       cell: (info) => (
//         <img
//           src={info.row.original.image_url || "/default-avatar.png"}
//           alt="Profile"
//           className="w-10 h-10 rounded-full"
//         />
//       ),
//     },
//     { accessorKey: "title", header: "Title" },
//     {
//       accessorKey: "content",
//       header: "Description",
//       cell: (info) => {
//         const description = info.getValue();
//         const truncated = description.split(" ").slice(0, 4).join(" ") + "........";
//         return <span>{truncated}</span>;
//       },
//     },
//     { accessorKey: "slug", header: "Slug" },
//   ];

//   return (
//     <div className="h-screen">
//       <div className="flex mt-3">
//         <h1 className="text-2xl w-full sticky mt-4 font-semibold px-2 mb-4">Blogs</h1>
//         <ActionButtons
//           actions={[
//             { onClick: handleAdd, icon: CirclePlus, text: "ADD" },
//             { onClick: handleEdit, icon: FilePenLine, text: "EDIT" },
//             { icon: Trash2, text: "DELETE" },
//             { icon: Archive, text: "ARCHIVE" },
//           ]}
//         />
//       </div>
//       <Search />
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <DataTable columns={columns} data={data} setSelectedRow={setSelectedRow} />
//       )}

//       {isModalOpen && (
//         <UserRegistrationForm
//           isModalOpen={isModalOpen}
//           setIsModalOpen={setIsModalOpen}
//           formFields={formFields}
//           initialValues={selectedRow}
//           apiEndpoint="blog"
//           handleSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// }
