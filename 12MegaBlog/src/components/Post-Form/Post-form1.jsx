// import React, {useCallback} from "react";
// import { useEffect } from 'react';
// import {useForm} from 'react-hook-form'
// import {Button, Input ,Select, RTE} from '../index'
// import service from "../../appwrite/config";
// import appwriteService from '../../appwrite/config'
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// // export default function PostForm({ post }) {
// //     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
// //         defaultValues: {
// //             title: post?.title || '',
// //             slug: post?.$id || '',
// //             content: post?.content || '',
// //             status: post?.status || 'active',
// //         },
// //     });

// //     const navigate = useNavigate();
// //     const userData = useSelector(state => state.auth.userData);

// //     // Add debugging and validation
// //     console.log('UserData:', userData);
// //     console.log('Auth State:', useSelector(state => state.auth));

// //     const submit = async (data) => {
// //         alert('SUBMIT FUNCTION CALLED!'); 
// //         console.log('Submit called with:', data);
// //         if (post) {
// //             const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

// //             if (file) {
// //                 appwriteService.deleteFile(post.featuredImage);
// //             }

// //             const dbPost = await service.updatePost(post.$id, {
// //                 ...data,
// //                 featuredImage: file ? file.$id : undefined,
// //             });

// //             if (dbPost) {
// //                 navigate(`/post/${dbPost.$id}`);
// //             }
// //         } else {
// //             const file = await service.uploadFile(data.image[0]);

// //             if (file) {
// //                 const fileId = file.$id;
// //                 data.featuredImage = fileId;
// //                 const dbPost = await service.createPost({ ...data, userId: userData.$id });

// //                 if (dbPost) {
// //                     navigate(`/post/${dbPost.$id}`);
// //                 }
// //             }
// //         }
// //     };

// //     const slugTransform = useCallback((value) => {
// //         if (value && typeof value === 'string') {
// //             return value
// //                 .trim()
// //                 .toLowerCase()
// //                 .replace(/[^a-zA-Z\d\s]+/g, "-")
// //                 .replace(/\s/g, "-");
// //         }
// //         return '';
// //     }, []);

// //     useEffect(() => {
// //         const subscription = watch((value, { name }) => {
// //             if (name === 'title') {
// //                 setValue('slug', slugTransform(value.title), { shouldValidate: true });
// //             }
// //         });

// //         return () => {
// //             subscription.unsubscribe();
// //         };
// //     }, [watch, slugTransform, setValue]);

// //     // Show loading or redirect if user not authenticated
// //     if (!userData) {
// //         return (
// //             <div className="flex justify-center items-center h-64">
// //                 <div className="text-center">
// //                     <p className="mb-4">Please log in to access this Post.</p>
// //                     <Button onClick={() => navigate('/login')}>
// //                         Go to Login
// //                     </Button>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //             <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
// //             <div className="w-2/3 px-2">
// //                 <Input
// //                     label="Title :"
// //                     placeholder="Title"
// //                     className="mb-4"
// //                     {...register("title", { required: true })}
// //                 />
// //                 <Input
// //                     label="Slug :"
// //                     placeholder="Slug"
// //                     className="mb-4"
// //                     {...register("slug", { required: true })}
// //                     onInput={(e) => {
// //                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
// //                     }}
// //                 />
// //                 <RTE 
// //                     label="Content :" 
// //                     name="content" 
// //                     control={control} 
// //                     defaultValue={getValues("content")} 
// //                 />
// //             </div>
// //             <div className="w-1/3 px-2">
// //                 <Input
// //                     label="Featured Image :"
// //                     type="file"
// //                     className="mb-4"
// //                     accept="image/png, image/jpg, image/jpeg, image/gif"
// //                     {...register("image", { required: !post })}
// //                 />
// //                 {post && (
// //                     <div className="w-full mb-4">
// //                         <img
// //                             src={service.getFileView(post.featuredImage)}
// //                             alt={post.title}
// //                             className="rounded-lg"
// //                         />
// //                     </div>
// //                 )}
// //                 <Select
// //                     options={["active", "inactive"]}
// //                     label="Status"
// //                     className="mb-4"
// //                     {...register("status", { required: true })}
// //                 />
// //                 <Button 
// //                     type="submit" 
// //                     bgColor={post ? "bg-green-500" : undefined} 
// //                     className="w-full"
// //                     disabled={!userData}
// //                 >
// //                     {post ? "Update" : "Submit"}
// //                 </Button>
// //                 {/* <button 
// //     type="submit" 
// //     className={`w-full px-4 py-2 rounded-lg ${post ? "bg-green-500" : "bg-blue-600"} text-white`}
// //     disabled={!userData}
// // >
// //     {post ? "Update" : "Submit"}
// // </button> */}
// //             </div>
// //         </form>
// //     );
// // }



// import React, {useCallback} from "react";
// import { useEffect } from 'react';
// import {useForm} from 'react-hook-form'
// import {Button, Input ,Select, RTE} from '../index'
// import service from "../../appwrite/config";
// import appwriteService from '../../appwrite/config'
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
//         defaultValues: {
//             title: post?.title || '',
//             slug: post?.$id || '',
//             content: post?.content || '',
//             status: post?.status || 'active',
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector(state => state.auth.userData);

//     // Add debugging and validation
//     console.log('UserData:', userData);
//     console.log('Auth State:', useSelector(state => state.auth));

//     // const submit = async (data) => {
//     //     alert('SUBMIT FUNCTION CALLED!'); 
//     //     console.log('Submit called with:', data);
        
//     //     try {
//     //         if (post) {
//     //             const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

//     //             if (file) {
//     //                 appwriteService.deleteFile(post.featuredImage);
//     //             }

//     //             const dbPost = await service.updatePost(post.$id, {
//     //                 ...data,
//     //                 featuredImage: file ? file.$id : undefined,
//     //             });

//     //             if (dbPost) {
//     //                 navigate(`/post/${dbPost.$id}`);
//     //             }
//     //         } else {
//     //             const file = await service.uploadFile(data.image[0]);

//     //             if (file) {
//     //                 const fileId = file.$id;
//     //                 data.featuredImage = fileId;
//     //                 const dbPost = await service.createPost({ ...data, userId: userData.$id });

//     //                 if (dbPost) {
//     //                     navigate(`/post/${dbPost.$id}`);
//     //                 }
//     //             }
//     //         }
//     //     } catch (error) {
//     //         console.error('Submit error:', error);
//     //     }
//     // };

//     // Multiple event handlers for testing
    
//     const submit = async (data) => {
//     console.log('🚀 Submit called');
    
//     try {
//         // Extract just what we need to avoid circular reference
//         const { title, slug, content, status, image } = data;
        
//         console.log('📋 Form data:', { title, slug, content, status, imageCount: image?.length || 0 });
        
//         if (!userData || !userData.$id) {
//             alert('Please log in to create/update posts');
//             return;
//         }

//         if (post) {
//             // UPDATE
//             const file = image?.[0] ? await service.uploadFile(image[0]) : null;
            
//             if (file) {
//                 appwriteService.deleteFile(post.featuredImage);
//             }

//             const dbPost = await service.updatePost(post.$id, {
//                 title,
//                 slug, 
//                 content,
//                 status,
//                 featuredImage: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             // CREATE
//             if (!image?.[0]) {
//                 alert('Please select an image file');
//                 return;
//             }
            
//             const file = await service.uploadFile(image[0]);

//             if (file) {
//                 const dbPost = await service.createPost({ 
//                     title,
//                     slug,
//                     content, 
//                     status,
//                     featuredImage: file.$id,
//                     userId: userData.$id 
//                 });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Submit error:', error);
//         alert(`Error: ${error.message}`);
//     }
// };

//     const handleFormSubmit = (e) => {
//         console.log('🎯 handleFormSubmit called');
//         e.preventDefault();
//         console.log('🛑 preventDefault called');
//         handleSubmit(submit)(e);
//     };

//     const handleButtonClick = (e) => {
//         console.log('🖱️ Button clicked, event type:', e.type);
//         console.log('🔍 Button element:', e.target);
//         console.log('📋 Current form values:', getValues());
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === 'string') {
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");
//         }
//         return '';
//     }, []);

//     useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === 'title') {
//                 setValue('slug', slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => {
//             subscription.unsubscribe();
//         };
//     }, [watch, slugTransform, setValue]);

//     // Show loading or redirect if user not authenticated
//     if (!userData) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="text-center">
//                     <p className="mb-4">Please log in to access this Post.</p>
//                     <Button onClick={() => navigate('/login')}>
//                         Go to Login
//                     </Button>
//                 </div>
//             </div>
//         );
//     }

//     // Debug info display
//     const debugInfo = (
//         <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0', fontSize: '12px' }}>
//             <h4>🐛 Debug Info:</h4>
//             <p>userData: {userData ? '✅' : '❌'}</p>
//             <p>post: {post ? '✅ (Update mode)' : '❌ (Create mode)'}</p>
//             {/* <p>Form errors: {JSON.stringify(errors)}</p> */}
//             <p>Current values: {JSON.stringify(watch())}</p>
//         </div>
//     );

//     return (
//         <div>
//             {debugInfo}
            
//             {/* Test Form 1: Using handleFormSubmit with preventDefault */}
//             <form onSubmit={handleFormSubmit} className="flex flex-wrap" style={{ border: '2px solid red', padding: '10px', marginBottom: '20px' }}>
//                 <h3 style={{ width: '100%', color: 'red' }}>🧪 TEST FORM 1 (with preventDefault)</h3>
//                 <div className="w-2/3 px-2">
//                     <Input
//                         label="Title :"
//                         placeholder="Title"
//                         className="mb-4"
//                         {...register("title", { required: true })}
//                     />
//                     <Input
//                         label="Slug :"
//                         placeholder="Slug"
//                         className="mb-4"
//                         {...register("slug", { required: true })}
//                         onInput={(e) => {
//                             setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                         }}
//                     />
//                     <RTE 
//                         label="Content :" 
//                         name="content" 
//                         control={control} 
//                         defaultValue={getValues("content")} 
//                     />
//                 </div>
//                 <div className="w-1/3 px-2">
//                     <Input
//                         label="Featured Image :"
//                         type="file"
//                         className="mb-4"
//                         accept="image/png, image/jpg, image/jpeg, image/gif"
//                         {...register("image", { required: !post })}
//                     />
//                     {post && (
//                         <div className="w-full mb-4">
//                             <img
//                                 src={service.getFileView(post.featuredImage)}
//                                 alt={post.title}
//                                 className="rounded-lg"
//                             />
//                         </div>
//                     )}
//                     <Select
//                         options={["active", "inactive"]}
//                         label="Status"
//                         className="mb-4"
//                         {...register("status", { required: true })}
//                     />
                    
//                     {/* Regular HTML button */}
//                     <button 
//                         type="submit" 
//                         onClick={handleButtonClick}
//                         className="w-full px-4 py-2 rounded-lg bg-red-600 text-white mb-2"
//                         disabled={!userData}
//                     >
//                         🧪 HTML Submit Button
//                     </button>
//                 </div>
//             </form>

//             {/* Test Form 2: Direct handleSubmit */}
//             <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" style={{ border: '2px solid blue', padding: '10px' }}>
//                 <h3 style={{ width: '100%', color: 'blue' }}>🧪 TEST FORM 2 (direct handleSubmit)</h3>
//                 <div className="w-2/3 px-2">
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         {...register("title2", { required: true })}
//                         style={{ width: '100%', padding: '8px', margin: '5px 0' }}
//                     />
//                     <input
//                         type="text"
//                         placeholder="Slug"
//                         {...register("slug2", { required: true })}
//                         style={{ width: '100%', padding: '8px', margin: '5px 0' }}
//                     />
//                     <textarea
//                         placeholder="Content"
//                         {...register("content2", { required: true })}
//                         style={{ width: '100%', padding: '8px', margin: '5px 0' }}
//                     />
//                 </div>
//                 <div className="w-1/3 px-2">
//                     <input
//                         type="file"
//                         accept="image/*"
//                         {...register("image2", { required: !post })}
//                         style={{ width: '100%', padding: '8px', margin: '5px 0' }}
//                     />
//                     <select
//                         {...register("status2", { required: true })}
//                         style={{ width: '100%', padding: '8px', margin: '5px 0' }}
//                     >
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                     </select>
                    
//                     <button 
//                         type="submit"
//                         className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white"
//                         onClick={(e) => {
//                             console.log('🔵 Blue button clicked');
//                             handleButtonClick(e);
//                         }}
//                     >
//                         🧪 Direct Submit
//                     </button>
//                 </div>
//             </form>

//             {/* Manual trigger buttons */}
//             <div style={{ margin: '20px 0' }}>
//                 <button 
//                     type="button"
//                     onClick={() => {
//                         console.log('🔧 Manual trigger');
//                         const data = getValues();
//                         console.log('📊 Manual data:', data);
//                         submit(data);
//                     }}
//                     className="px-4 py-2 mr-2 bg-green-600 text-white rounded"
//                 >
//                     🔧 Manual Trigger
//                 </button>

//                 <button 
//                     type="button"
//                     onClick={() => {
//                         console.log('🔍 Debug all states:');
//                         console.log('- Form values:', getValues());
//                         console.log('- Form errors:', errors);
//                         console.log('- userData:', userData);
//                         console.log('- post:', post);
//                     }}
//                     className="px-4 py-2 bg-yellow-600 text-white rounded"
//                 >
//                     🔍 Debug State
//                 </button>
//             </div>
//         </div>
//     );
// }

// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Button from "./Button";
// import Input from "./Input";
// import RTE from "./RTE";
// import Select from "./Select";
// import appwriteService from "../../appwrite/config";

import React, {useCallback} from "react";
import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {Button, Input ,Select, RTE} from '../index'
import service from "../../appwrite/config";
import appwriteService from '../../appwrite/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            // Update existing post
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // Create new post
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ 
                    ...data, 
                    userId: userData.$id 
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE 
                    label="Content :" 
                    name="content" 
                    control={control} 
                    defaultValue={getValues("content")} 
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-green-500" : undefined} 
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}