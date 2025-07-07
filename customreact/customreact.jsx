
import React from 'react';
const mainContainer = document.getElementById('root')
console.log(mainContainer)
console.log("YAYY")
const reactElement = {
    type: 'a',
    props:{
        href : 'https://google.com',
        target : '_blank'
    },
    children: 'Click me to Visit Google'
    
    
};

function customrender(reactElement, container) {
    /*const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    domElement.setAttribute('href', reactElement.props.href)
    domElement.setAttribute('href', reactElement.props.target)
    container.appendChild(domElement)*/
    const domElement =  document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    for (const prop in reactElement.props) {
        if (prop === 'children') continue;
        domElement.setAttribute(prop, reactElement.props[prop])
        
    }
    container.appendChild(domElement)
}

// function Chai(){
    //     return (
        //         "hhh"
        //         // <h2>CHAI aur YASH</h2>
        //     )
        // }
        
        // const ReactElement = {
            //     type: 'a',
            //     props:{
                //         href : 'https://google.com',
                //         target : '_blank'
//     },
//     children: 'Click me to Visit Google'
// };

const evalexpress = "YASHHHHHH";
// According to React Sytax
const AnotherElement = React.createElement(
        'a',
        {
                href: "https://www.google.com",
                target: "_blank"
            },
            'Click to visit Google',
            evalexpress,
            'This is an Eval Expression'
        )
        // const a = (
        //         // <a href="https://www.google.com" target="_blank" >Visit Google</a>
        //         <h1>YASASS</h1>
        //     )
            
            // const root = ReactDOM.createRoot(document.getElementById('root'));
            // root.render(
        
            //     // <App />
            //     Chai
            //     // AnotherElement
                
            // );
            
customrender(reactElement, mainContainer)