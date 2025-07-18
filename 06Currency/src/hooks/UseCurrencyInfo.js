import { useEffect, useState } from "react";

// async function UseCurrencyInfo(){
//     useEffect( ()=>{
//         try {
//         let yash =fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`)
//         .then((res) => res.json())
//         console.log(yash)
//         }
//         catch {
//             console.log(Errir);
            
//         }
//     })
// }
 function UseCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    let respo;
    respo =  fetch(url)
    .then ((res)=> res.json())
    .then ((res) => setData(res[currency]))
    // console.log(data);
    
    }, [currency])
    // console.log(data);
    return data
 } 
export default UseCurrencyInfo;