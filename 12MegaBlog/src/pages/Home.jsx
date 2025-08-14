// import React, { useEffect, useState } from "react";

// import appwriteservice from "../appwrite/config";  //instead of service (test)
// import { Container, PostCard } from "../components";

// function Home(){
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         appwriteservice.getPosts().then((posts) => {
//             if(posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     },[] )

//     if (posts.length === 0){
//         return (
//             <div className="w-full py-8 text-center mt-4 ">
//                 <Container>
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500 ">Login to Read Posts</h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         )
//     }

//     return(
//         <div className="w-full py-8 ">
//                 <Container>
//                     <div className="flex flex-wrap"> 
//                         {posts.map((post) => (
//                             <div key={post.$id} className="p-2 w-1/4">
//                                 <PostCard {...post} />
//                             </div>
//                         ))}
//                     </div>
//                 </Container> 
//         </div>

//     )
// }

// export default Home

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appwriteservice from "../appwrite/config";
import { Container, PostCard, Button } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Get authentication status
    const authStatus = useSelector(state => state.auth.status);
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                console.log("Fetching posts...");
                const response = await appwriteservice.getPosts();
                
                if (response && response.documents) {
                    console.log("Posts fetched:", response.documents.length);
                    setPosts(response.documents);
                } else {
                    console.log("No posts found");
                    setPosts([]);
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading posts...</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="text-red-500 text-4xl mb-4">⚠️</div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <Button 
                                onClick={() => window.location.reload()} 
                                className="bg-blue-500 hover:bg-blue-600 transition-colors"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // No posts found - different messages based on auth status
    if (posts.length === 0) {
        if (!authStatus) {
            // User not logged in
            return (
                <div className="w-full py-8 text-center mt-4">
                    <Container>
                        <div className="flex flex-wrap justify-center">
                            <div className="p-2 w-full max-w-md">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <h1 className="text-2xl font-bold text-blue-800 mb-4">
                                        Welcome to Our Blog!
                                    </h1>
                                    <p className="text-blue-600 mb-6">
                                        Please log in to read and create amazing posts from our community.
                                    </p>
                                    <Link to="/login">
                                        <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                                            Login to Continue
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        } else {
            // User logged in but no posts exist
            return (
                <div className="w-full py-8 text-center mt-4">
                    <Container>
                        <div className="flex flex-wrap justify-center">
                            <div className="p-2 w-full max-w-md">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                        No Posts Yet
                                    </h1>
                                    <p className="text-gray-600 mb-6">
                                        Be the first to share something amazing! Create your first post and start the conversation.
                                    </p>
                                    <Link to="/add-post">
                                        <Button className="bg-green-600 hover:bg-green-700 transition-colors">
                                            Create First Post
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }
    }

    // Posts found - display them
    return (
        <div className="w-full py-8">
            <Container>
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Latest Posts
                    </h1>
                    <p className="text-gray-600">
                        Discover amazing content from our community
                    </p>
                    {authStatus && (
                        <div className="mt-4">
                            <Link to="/add-post">
                                <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                                    Create New Post
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Posts Grid */}
                <div className="flex flex-wrap -mx-2">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-gray-500">
                    <p>Showing {posts.length} post{posts.length !== 1 ? 's' : ''}</p>
                </div>
            </Container>
        </div>
    );
}

export default Home;