import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
export default function Github() {
        const data = useLoaderData()
    // const [data,setData] = useState([])
    // useEffect(() => {
    //     fetch('https://api.github.com/users/ayash2004')
    //     .then(response => response.json())
    //     .then(data => {
    //         // console.log(data);
    //         setData(data);
    //     })
    // })

  return (
      <div className="text-center text-white bg-gray-600 p-4 text-4xl">Github Username: {data.name}
      <img src={data.avatar_url} alt="Git Picture" width={300} />
      </div>
      
    );

}

export const githubInfoLoader = async () =>{
    const response = await( fetch('https://api.github.com/users/ayash2004'))
    return response.json()
}