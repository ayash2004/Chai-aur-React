// import React from "react";
// import appwriteService from "../appwrite/config"
// import {Link} from 'react-router-dom'

// function PostCard({$id, title, featuredImage}){

//     return (
//         <Link to={`/post/${$id}`}>
//             <div className="w-full bg-gray-500 rounded-xl py-4 ">
//                 <div className="w-full justify-center mb-4">
//                     <img src={appwriteService.getFileView(featuredImage)} alt="Post Image " className="rounded-xl" />
//                 </div>

//                 <h2 className='text-xl font-bold'>{title}</h2>
//             </div>
//         </Link>
//     )
// }

// export default PostCard

// import React from 'react'
// import appwriteService from "../appwrite/config"
// import {Link} from 'react-router-dom'

// function PostCard({$id, title, featuredImage}) {
    
//   return (
//     <Link to={`/post/${$id}`}>
//         <div className='w-full bg-gray-100 rounded-xl p-4'>
//             <div className='w-full justify-center mb-4'>
//                 <img src={appwriteService.getFileView(featuredImage)} alt={title}
//                 className='rounded-xl' />
//             </div>
//             <h2
//             className='text-xl font-bold'
//             >{title}</h2>
//         </div>
//     </Link>
//   )
// }


// export default PostCard

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/config';

function PostCard({ $id, title, featuredImage, content, status, $createdAt }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    // Get image URL safely
    const getImageUrl = () => {
        if (!featuredImage) return null;
        try {
            return service.getFileView(featuredImage);
        } catch (error) {
            console.error('Error getting image preview:', error);
            return null;
        }
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return '';
        }
    };

    // Truncate content for preview
    const getContentPreview = (htmlContent, maxLength = 100) => {
        if (!htmlContent) return 'No content available...';
        
        // Remove HTML tags and get plain text
        const textContent = htmlContent.replace(/<[^>]*>/g, '');
        
        if (textContent.length <= maxLength) return textContent;
        return textContent.substring(0, maxLength) + '...';
    };
    
    const imageUrl = getImageUrl();

    return (
        <Link to={`/post/${$id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {imageUrl && !imageError ? (
                        <>
                            {imageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                </div>
                            )}
                            <img
                                src={imageUrl}
                                alt={title || 'Post image'}
                                className={`w-full h-full object-cover transition-opacity duration-300 ${
                                    imageLoading ? 'opacity-0' : 'opacity-100'
                                }`}
                                onLoad={() => setImageLoading(false)}
                                onError={() => {
                                    setImageError(true);
                                    setImageLoading(false);
                                }}
                            />
                        </>
                    ) : (
                        /* Fallback when no image or error */
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                            <div className="text-center text-gray-500">
                                <svg 
                                    className="w-12 h-12 mx-auto mb-2 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={1.5} 
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                    />
                                </svg>
                                <p className="text-sm">No Image</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                        }`}>
                            {status || 'draft'}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {title || 'Untitled Post'}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-gray-600 text-sm mb-3 flex-1 line-clamp-3">
                        {getContentPreview(content)}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                            {formatDate($createdAt)}
                        </div>
                        <div className="text-xs text-blue-600 font-medium hover:text-blue-800 transition-colors">
                            Read More →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;