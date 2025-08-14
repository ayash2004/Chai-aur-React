// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import appwriteService from "../appwrite/config";
// // import { Button, Container } from "../components";
// // import parse from "html-react-parser";
// // import { useSelector } from "react-redux";

// // export default function Post() {
// //     const [post, setPost] = useState(null);
// //     const { slug } = useParams();
// //     const navigate = useNavigate();

        

// //     const isAuthor = post && userData ? post.userId === userData.$id : false;

// //     useEffect(() => {
// //         if (slug) {
// //             appwriteService.getPost(slug).then((post) => {
// //                 if (post) setPost(post);
// //                 else navigate("/");
// //             });
// //         } else navigate("/");
// //     }, [slug, navigate]);

// //     const deletePost = () => {
// //         appwriteService.deletePost(post.$id).then((status) => {
// //             if (status) {
// //                 appwriteService.deleteFile(post.featuredImage);
// //                 navigate("/");
// //             }
// //         });
// //     };

// //     return post ? (
// //         <div className="py-8">
// //             <Container>
// //                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
// //                     <img
// //                         src={appwriteService.getFileView(post.featuredImage)}
// //                         alt={post.title}
// //                         className="rounded-xl"
// //                     />
// //                     {isAuthor && (
// //                         <div className="absolute right-6 top-6">
// //                             <Link to={`/edit-post/${post.$id}`}>
// //                                 <Button bgColor="bg-green-500" className="mr-3">
// //                                     Edit
// //                                 </Button>
// //                             </Link>
// //                             <Button bgColor="bg-red-500" onClick={deletePost}>
// //                                 Delete
// //                             </Button>
// //                         </div>
// //                     )}
// //                 </div >
// //                 <div className="w-full mb-6">
// //                     <h1 className="text-2xl font-bold">{post.title}</h1>
// //                 </div>
// //                 <div className="browser-css">
// //                     {parse(post.content)}
// //                     </div>
// //             </Container>
// //         </div>
// //     ) : null;
// // }

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();
//     const userData = useSelector(state => state.auth.userData);

//     const isAuthor = post && userData ? post.userId === userData.$id : false;
//     console.log(isAuthor);
    
//     // const isAuthor= "Yash"
//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                         src={appwriteService.getFileView(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />
//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div >
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                     </div>
//             </Container>
//         </div>
//     ) : null;
// }

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);
    
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    // Check if current user is the author
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    
    // Debug logs
    console.log('Post:', post);
    console.log('UserData:', userData);
    console.log('Is Author:', isAuthor);
    console.log('Post userId:', post?.userId);
    console.log('Current user $id:', userData?.$id);

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) {
                navigate("/");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                const fetchedPost = await appwriteService.getPost(slug);
                
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    setError("Post not found");
                    setTimeout(() => navigate("/"), 2000);
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load post");
                setTimeout(() => navigate("/"), 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    // Handle post deletion
    const handleDeletePost = async () => {
        if (!post) return;

        // Confirm deletion
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${post.title}"? This action cannot be undone.`
        );
        
        if (!confirmDelete) return;

        try {
            setDeleting(true);
            console.log('Deleting post with ID:', post.$id);

            // Delete the post document
            const deleteStatus = await appwriteService.deletePost(post.$id);
            
            if (deleteStatus) {
                console.log('Post deleted successfully, now deleting image...');
                
                // Delete associated image if it exists
                if (post.featuredImage) {
                    try {
                        await appwriteService.deleteFile(post.featuredImage);
                        console.log('Image deleted successfully');
                    } catch (imageError) {
                        console.warn('Failed to delete image, but post was deleted:', imageError);
                        // Don't block navigation if image deletion fails
                    }
                }
                
                // Show success message and navigate
                alert('Post deleted successfully!');
                navigate("/");
            } else {
                throw new Error('Failed to delete post');
            }
        } catch (err) {
            console.error("Error deleting post:", err);
            alert('Failed to delete post. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                            <p>Loading post...</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="text-red-500 text-xl mb-4">⚠️</div>
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={() => navigate("/")} className="bg-blue-500">
                                Go Back Home
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Main post display
    return post ? (
        <div className="py-8">
            <Container>
                {/* Featured Image Section */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImage ? (
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl max-w-full h-auto"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                console.error('Failed to load image');
                            }}
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                            <p className="text-gray-500">No image available</p>
                        </div>
                    )}
                    
                    {/* Edit/Delete Buttons - Only show if user is author */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button 
                                    bgColor="bg-green-500" 
                                    className="mr-3 hover:bg-green-600 transition-colors"
                                    disabled={deleting}
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                bgColor="bg-red-500" 
                                className="hover:bg-red-600 transition-colors"
                                onClick={handleDeletePost}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Post Title */}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
                    
                    {/* Post Metadata */}
                    <div className="mt-2 text-sm text-gray-600 flex items-center gap-4">
                        <span>Status: {post.status}</span>
                        {post.slug && <span>Slug: {post.slug}</span>}
                        {/* You can add more metadata like created date, author name, etc. */}
                    </div>
                </div>

                {/* Post Content */}
                <div className="browser-css prose prose-lg max-w-none">
                    {post.content ? parse(post.content) : <p>No content available</p>}
                </div>

                {/* Back to Home Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <Button 
                        onClick={() => navigate("/")} 
                        className="bg-gray-500 hover:bg-gray-600 transition-colors"
                    >
                        ← Back to Posts
                    </Button>
                </div>
            </Container>
        </div>
    ) : null;
}