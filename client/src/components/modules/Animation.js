import React from 'react';
import "./Animation.css";
import "../../utilities.css";

const Fire = (props) => {
   const {useDefault, currColor, login} = props;
   let firePos = "Animation-svg";
   let textPos = "Animation-fire";
   if (login === true) {
        firePos = "Animation-login";
    } else if  (login  === 'prehome'){
        firePos = "Animation-prehome";
        textPos = "Animation-firePreHome";
    }
   return (
       <>
       <div className = "Animation-container">
       <svg className={firePos}
       xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 528.4 685.71">
           <defs>
               <radialGradient id="radial-gradient-1" cx="1034.65" cy="546.62" r="42.91" gradientTransform="translate(0 -1223.87) scale(1 3.24)" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#f5cd71"/>
                   <stop offset="0.17" stopColor="#f5c86b"/>
                   <stop offset="0.38" stopColor="#f6bb5b"/>
                   <stop offset="0.62" stopColor="#f8a541"/>
                   <stop offset="0.87" stopColor="#fb871d"/>
                   <stop offset="1" stopColor="#fc7608"/>
               </radialGradient>
               <radialGradient id="radial-gradient-2" cx="965.38" cy="550.02" r="243.09" gradientTransform="translate(0 286.5) scale(1 0.42)" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#f5cd71"/>
                   <stop offset="0.2" stopColor="#f6c061"/>
                   <stop offset="0.59" stopColor="#f99e39"/>
                   <stop offset="1" stopColor="#fc7608"/>
               </radialGradient>
               <radialGradient id="radial-gradient-3" cx="792.46" cy="561.15" r="172.36" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#ffdc6b"/>
                   <stop offset="0.3" stopColor="#ffbd53"/>
                   <stop offset="0.95" stopColor="#ff6f17"/>
                   <stop offset="1" stopColor="#ff6912"/>
               </radialGradient>
               <radialGradient id="radial-gradient-4" cx="732.27" cy="721.23" r="62.19" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#f5cd71"/>
                   <stop offset="0.2" stopColor="#f5ca6d"/>
                   <stop offset="0.39" stopColor="#f6c061"/>
                   <stop offset="0.59" stopColor="#f7af4d"/>
                   <stop offset="0.78" stopColor="#f99831"/>
                   <stop offset="0.98" stopColor="#fc7a0d"/>
                   <stop offset="1" stopColor="#fc7608"/>
               </radialGradient>
               <radialGradient id="radial-gradient-5" cx="909.85" cy="657.78" r="264.37" gradientTransform="translate(0 188.78) scale(1 0.69)" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#f5cd71"/>
                   <stop offset="0.21" stopColor="#f5ca6d"/>
                   <stop offset="0.4" stopColor="#f6c162"/>
                   <stop offset="0.59" stopColor="#f7b150"/>
                   <stop offset="0.77" stopColor="#f99c35"/>
                   <stop offset="0.94" stopColor="#fb8014"/>
                   <stop offset="1" stopColor="#fc7608"/>
               </radialGradient>
               <radialGradient id="radial-gradient-6" cx="901.77" cy="791.9" r="226.23" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#f7c743"/>
                   <stop offset="1" stopColor="#ff7b3d"/>
               </radialGradient>
               <radialGradient id="radial-gradient-7" cx="945.87" cy="782.06" r="89.24" gradientTransform="translate(0 173.11) scale(1 0.78)" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#f7dc60"/>
                   <stop offset="0.17" stopColor="#f7d75e"/>
                   <stop offset="0.36" stopColor="#f7ca5a"/>
                   <stop offset="0.56" stopColor="#f6b452"/>
                   <stop offset="0.76" stopColor="#f69548"/>
                   <stop offset="0.97" stopColor="#f56d3a"/>
                   <stop offset="1" stopColor="#f56738"/>
               </radialGradient>
               <radialGradient id="radial-gradient-8" cx="877.44" cy="772.13" r="150.81" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#ffe15c"/>
                   <stop offset="1" stopColor="#ff673d"/>
               </radialGradient>
               <radialGradient id="radial-gradient-9" cx="849.56" cy="513.1" r="74.58" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#ffc145"/>
                   <stop offset="1" stopColor="#ff613d"/>
               </radialGradient>
               <radialGradient id="radial-gradient-10" cx="814.08" cy="759.97" r="146.16" gradientUnits="userSpaceOnUse">
                   <stop offset="0" stopColor="#ffdf52"/>
                   <stop offset="0.17" stopColor="#fdd34f"/>
                   <stop offset="0.46" stopColor="#f9b548"/>
                   <stop offset="0.85" stopColor="#f3833c"/>
                   <stop offset="1" stopColor="#f06f37"/>
               </radialGradient>

               {/*going to define more gradients:*/}
               <linearGradient id="yellow" gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="#fff75e"/>
                   <stop offset="0.17" stopColor="#ffe94e"/>
                   <stop offset="0.33" stopColor="#ffe246"/> 
                   <stop offset="0.50" stopColor="#ffd53e"/>
                   <stop offset="0.67" stopColor="#fdc43f"/>
                   <stop offset="0.83" stopColor="#fdbe39"/>
                   <stop offset="1" stopColor="#fdb833"/>
               </linearGradient>
               <linearGradient id="blue" gradientTransform="rotate(90)">
                    <stop offset="0" stopColor="#919bff"/>
                    <stop offset="0.17" stopColor="#8894f8"/>
                    <stop offset="0.33" stopColor="#7082e4"/> 
                    <stop offset="0.50" stopColor="#4b65c4"/>
                    <stop offset="0.67" stopColor="#4561bf"/>
                    <stop offset="0.83" stopColor="#2b4da8"/>
                    <stop offset="1" stopColor="#133a94"/>
               </linearGradient>
               <linearGradient id="pinkPurple" gradientTransform="rotate(90)" >
                    <stop offset="0" stopColor="#f3c4fb"/>
                    <stop offset="0.17" stopColor="#ecbcfd"/>
                    <stop offset="0.33" stopColor="#deaaff"/> 
                    <stop offset="0.50" stopColor="#d8bbff"/>
                    <stop offset="0.67" stopColor="#d0d1ff"/>
                    <stop offset="0.83" stopColor="#c8e7ff"/>
                    <stop offset="1" stopColor="#c0fdff"/>
               </linearGradient>
               <linearGradient id="purple" gradientTransform="rotate(90)" >
                    <stop offset="0" stopColor="#dc97ff"/>
                    <stop offset="0.17" stopColor="#bd68ee"/>
                    <stop offset="0.33" stopColor="#ab51e3"/> 
                    <stop offset="0.50" stopColor="#8b2fc9"/>
                    <stop offset="0.67" stopColor="#6818a5"/>
                    <stop offset="0.83" stopColor="#4a0a77"/>
                    <stop offset="1" stopColor="#310055"/>
               </linearGradient>
               <linearGradient id="pink" gradientTransform="rotate(90)" >
                    <stop offset="0" stopColor="#ff80c4"/>
                    <stop offset="0.17" stopColor="#ff73be"/>
                    <stop offset="0.33" stopColor="#ff4ab9"/> 
                    <stop offset="0.50" stopColor="#ff19b3"/>
                    <stop offset="0.67" stopColor="#e817a3"/>
                    <stop offset="0.83" stopColor="#d31594"/>
                    <stop offset="1" stopColor="#c01387"/>
               </linearGradient>
               <linearGradient id="rainbow" gradientTransform="rotate(90)" >
                    <stop offset="0" stopColor="#be0aff"/>
                    <stop offset="0.1" stopColor="#580aff"/>
                    <stop offset="0.2" stopColor="#147df5"/>
                    <stop offset="0.3" stopColor="#0aefff"/> 
                    <stop offset="0.4" stopColor="#0aff99"/>
                    <stop offset="0.5" stopColor="#a1ff0a"/>
                    <stop offset="0.6" stopColor="#deff0a"/>
                    <stop offset="0.8" stopColor="#ffd300"/>
                    <stop offset="0.9" stopColor="#ff8700"/>
                    <stop offset="1" stopColor="#ff0000"/>
               </linearGradient>

               <linearGradient id="party" gradientTransform="rotate(90)" >
                    <stop offset="0" stopColor="#f20089"/>
                    <stop offset="0.17" stopColor="#e500a4"/>
                    <stop offset="0.33" stopColor="#db00b6"/> 
                    <stop offset="0.50" stopColor="#d100d1"/>
                    <stop offset="0.67" stopColor="#b100e8"/>
                    <stop offset="0.83" stopColor="#8900f2"/>
                    <stop offset="1" stopColor="#2d00f7"/>
               </linearGradient>
               
               
               </defs>
               
               <g id="background4">
                   <path className="Animation-color" d="M1052.15,461.42c11-6.7,23.38-11.95,31.24-22.11,8.52-11,10.1-25.81,10-39.73s-1.64-28.1,1.93-41.56,13.81-26.38,27.65-27.84c-14,15.08-17.57,37.13-16.9,57.69s4.93,41,3.93,61.52c-1.18,24.48-9.76,47.92-18.24,70.92-7.52,20.4-15.19,41.06-27.79,58.78-6.18,8.69-13.54,16.67-18,26.34-7.69,16.56-6,35.75-4.19,53.92a224,224,0,0,1-37.23-81.91c-4.94-21.73-6.47-45.12,1.83-65.8,6.31-15.74,17.94-28.86,31.1-39.56Z" transform="translate(-627.19 -149.11)" 
                //    fill="url(#radial-gradient-1)"
                   fill="url(#radial-gradient-1)"
                   />
                </g>
                <g id="background3">
                    <path className="Animation-color" d="M911.45,447.55c-1.56-23,10.48-44.38,19.07-65.78,8.29-20.64,13.6-42.76,12.75-65s-8.22-44.57-22.9-61.27C955,291.2,975,338.5,990,385.94c5.24,16.62,10,33.65,10.29,51.07.25,14.85-2.74,29.54-5.73,44.08-6,29.41-12.11,59-23.15,86.93a270.07,270.07,0,0,1-58.89-107.9Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-2)"
                    fill="url(#radial-gradient-2)"
                    />
                </g>
                <g id="background2">
                    <path className="Animation-color" d="M723.93,476.79c1.58,30.85,5.26,63.42,23.92,88,7,9.29,16.83,17.44,28.42,18.62,13.09,1.33,25.38-6.39,35.13-15.21,5.47-4.94,10.66-10.54,13.13-17.48,3.88-10.92.35-23-3.82-33.8-16-41.57-41.5-79.46-52.84-122.53a197.9,197.9,0,0,1-5.32-71.84c-15.78,33.68-35.41,62.29-39.48,99.26a52.1,52.1,0,0,0-.49,6.64S722.23,443.71,723.93,476.79Z" 
                    transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-3)"
                    fill="url(#radial-gradient-3)"
                    />
                </g>
                <g id="background1">
                    <path className="Animation-color" d="M687.67,787c-15.81-12.27-67.21-48.61-59.75-88,7.14-37.69,1-5.2,24.36-55.32,4.07-8.72-7-34.35-16.9-30.87,21.26.69,38.79,34.43,53.54,57.21,26.29,40.6,30.08,58.9,86.91,92.06,10.87,6.34,108.47,53.85,116.77,63.3,3,3.47-140.72-16.65-145.66-17C732.32,807.18,687.67,787,687.67,787Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-4)"
                    fill="url(#radial-gradient-4)"
                    />
                </g>
                <g id="main">
                    <path className="Animation-color" d="M979.51,551.34c-6.37-45.32,31.29-89.83,39.56-135.83.16-.86-.08-2.63,0-3.5,1-10.34-4.36-41.15-7.84-56-5.15-22,16-53.06,16-53.06s-3.47,30.38-3.75,31.54c-3,12.38,12.72,40.1,12.72,40.1s9.88,19.64,11.34,26.76c6.65,32.52,20.84,91.48,2.39,129.77-6.76,14-22.53,27.22-22.53,58.12,0,10.39-2.81,20.36,3.91,34.6,3.66,7.76,22.42,25.72,22.87,25.59H1054c-8.2-8.85-2.06-43.48,5.3-55.24,6.93-11,30.33-25,38.72-35,9-10.73,19.24-37.88,9.64-55.16,29,50.93,18,129.81,1,168.3-6.37,14.41-23.7,34.81-33.24,53.54l5.91-4c16.11-9.63,24.41-28.92,35.82-40.33,14.32-14.32,28-53.7,16.21-64.82,24.5,30.68,22.11,35.56,22.11,59.27,0,26.57-4,36.25-20.34,53.43-20.92,22-58.25,46-58.25,46-74.71,60-184.31,72.64-270.73,31.31-39.7-19-75-49.73-95.22-88.35a159.41,159.41,0,0,1-12.39-31l-.14-1.31L692,656.16c-7.79-21.47-6.8-46-5.07-70.28,2.45-34.55,17.53-68.27,15.24-102.82,12.21,19.69,19.89,37.25,32.1,56.94,20.81,17.43,37.73,37.82,68.57,30.4-5.17-25.9,7.4-88.95-13.73-121.7-36.09-68.78,75.23-173.4-2.23-225.23,64.9.46,70.56,90.4,117.06,119.31C920.19,353,941.6,357,952,373.13c15.53,24.09-4.22,54.77-6.56,83.34-2.75,33.45,20.09,64.54,33.94,94.14Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-5)"
                    fill="url(#radial-gradient-5)"
                    />
                </g>
                <g id="middle">
                    <path className="Animation-color" d="M752.43,663.41C734.13,625.68,732,580.84,745,541c-32.48,18.43-50.78,56.26-52.67,93.55s10.64,74,28,107.09c7.58,14.47,16.32,28.71,28.73,39.35,15.88,13.63,26.51,26.33,43.78,38.14,7,4.76,23.45,4.39,31.23,7.64,9.76,4.07,20.65,4,31.22,4.47,29.37,1.2,59,6.43,88,1.61,30.91-5.14,58.71-21.29,85.73-37.15,7.3-4.29,14.76-8.71,20.16-15.22,8.83-10.65,10.93-25.54,9.26-39.27s-6.64-26.8-10.58-40.06c-11.63-39.15-14.12-81.48-3.57-120.93a191.09,191.09,0,0,1,41.39-77c-8.21,1.13-15.37,6-22.2,10.65-21.11,14.51-43,29.92-54.85,52.64-7.44,14.31-10.29,30.49-13,46.38-38.74-21.31-72.65-56.78-79.29-100.5-1.68-11.12-1.58-22.47-3.79-33.49A82,82,0,0,0,884,431.74c4.17,2.05,5.44,7.33,5.88,11.95a92.59,92.59,0,0,1-8.48,48.16c-14.55,30.63-45.64,52.7-53.67,85.64-5.94,24.4,3.2,51.84,22.6,67.8-8,2.91-17.18,0-23.68-5.45s-16.74-7.11-20.34-14.8c-6.42-13.72-11.21-23.07-9.09-43.49-26,8.57-.82,66.08-31.07,94.34C753.55,671,754.24,665.54,752.43,663.41Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-6)"
                    fill="url(#radial-gradient-6)"
                    />
                </g>
                <g id="front4">
                    <path className="Animation-color" d="M953.21,618.62c8.93,2.57,14.13,12.53,14,21.83s-4.38,18-9,26.06a258.22,258.22,0,0,1-27.07,38.7c-7.39,8.73-15.46,17.13-20.4,27.43-7.12,14.83-7,32.37-2.59,48.22s12.77,30.3,21.73,44.09a8,8,0,0,0,2.84,3c2.38,1.2,5.19-.15,7.49-1.5q24-14,47.32-29.22c5.87-3.84,11.78-7.8,16.43-13a54.38,54.38,0,0,0,7.51-11.39c13.28-26,11.23-58.82-3.71-84-9.49-16-23.71-29.08-30.8-46.23-2.6-6.31-4.24-13.16-8.33-18.62s-11.75-9.16-17.82-6C951.8,617.65,952.77,617.33,953.21,618.62Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-7)"
                    fill="url(#radial-gradient-7)"
                    />
                </g>
                <g id="front3">
                    <path className="Animation-color" d="M859.28,645.28c2.93-13.44,10.54-25.34,18.38-36.64s16.17-22.53,20.86-35.46,5.28-28.15-2-39.81c9.26,15,15.91,31.44,22.06,48,6.26,16.79,12.08,33.89,14.6,51.63s1.58,36.31-5.31,52.85c-7.38,17.69-21.16,32.29-27.49,50.38A79.78,79.78,0,0,0,896.58,753a99.12,99.12,0,0,0,16.47,67.15,109.05,109.05,0,0,1-35.21-14.81c-3.19-2.06-6.33-4.35-8.53-7.43a34.07,34.07,0,0,1-4.19-9.37c-3.15-9.62-6-19.46-6.37-29.58s-.55-29.94-2.65-39.84C853.11,705,856.94,656,859.28,645.28Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-8)"
                    fill="url(#radial-gradient-8)"
                    />
                </g>
                <g id="front2">
                    <path className="Animation-color" d="M829.92,359.19c4.08,23.48,34.44,44.89,44.21,73.62,4.34,12.76,4.34,26.63,2.42,40a145.12,145.12,0,0,1-38.14,78.6c-9.22-9.59-18.75-19.7-22.54-32.45-2.88-9.63-2.19-20-.49-29.89a151.63,151.63,0,0,1,12.7-39.89c3.75-7.82,8.2-15.39,10.61-23.72,2.29-7.92,2.66-16.29,2.08-24.51C839.73,386,831.45,373.18,829.92,359.19Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-9)"
                    fill="url(#radial-gradient-9)"
                    />
                </g>
                <g id="front1">
                    <path className="Animation-color" d="M804.24,578.13A211.6,211.6,0,0,1,845.62,684.6a263.35,263.35,0,0,1,1,32,352.71,352.71,0,0,1-16.16,96.57C817,805,805.14,794.57,793.7,783.82c-6.22-5.83-12.37-11.81-17.41-18.69A94.49,94.49,0,0,1,764.19,742a125.51,125.51,0,0,1,5.46-98.29c5.56-11.11,12.79-21.37,17.69-32.78A89.23,89.23,0,0,0,794.08,585a30.08,30.08,0,0,0-.38-10.75,36.39,36.39,0,0,0-2.86-6.9c-3.65-7.36-7.31-15.23-10.47-22.84C780.55,544.45,795.81,567,804.24,578.13Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-10)"
                    fill="url(#radial-gradient-10)"
                    />
                </g>
                <g id="flame5">
                    <path className="Animation-color" d="M849.33,149.11c-3,2.69-6.12,5.46-8.06,9s-2.53,8.12-.45,11.61,6,5,8.4,8.11a11,11,0,0,1,2.3,7.78c3.48.31,5.36-4.35,4.47-7.73s-3.34-6.21-4.07-9.62C850.7,162.64,853.88,155.4,849.33,149.11Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-10)"
                    fill="url(#radial-gradient-10)"
                    />
                </g>
                <g id="flame4">
                    <path className="Animation-color" d="M946.61,204.9a93.24,93.24,0,0,0,4,26.9c7.16-1.88,9.23-11.29,7.82-18.56s-4.88-14.48-3.53-21.76C948.75,194.41,946.62,202,946.61,204.9Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-10)"
                    fill="url(#radial-gradient-10)"
                    />
                </g>
                <g id="flame3">
                    <path className="Animation-color" d="M881.83,263.57c-.15,3.36.22,6.88,2,9.74,3.15,5.11,9.75,6.78,14.31,10.69a18.28,18.28,0,0,1,3.71,22.44c3.84-4.53,7.74-9.19,9.8-14.75s1.9-12.33-1.89-16.89c-3.44-4.13-9.23-5.82-12.44-10.13-4.29-5.77-2.49-13.85-.5-20.76l3.88-13.5C895.52,233.56,882.23,254.41,881.83,263.57Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-10)"
                    fill="url(#radial-gradient-10)"
                    />
                </g>
                <g id="flame2">
                    <path className="Animation-color" d="M764,346.13c-6.66-21.65-8.52-44.32-7.11-66.93.14-2.23.43-4.69,2.06-6.22,7.8,5.69,14.5,13.18,18.08,22.15s3.8,19.49-.59,28.09c-1.45,2.83-3.36,5.42-4.83,8.24a30.56,30.56,0,0,0-3.21,17.37C767.48,346.8,765.44,348.67,764,346.13Z" transform="translate(-627.19 -149.11)" 
                    // fill="#f29129"
                    fill="#f29129"
                    />
                </g>
                <g id="flame1">
                    <path className="Animation-color" d="M689.91,379.82c-5.7,5.09-11.37,10.65-14.14,17.77s-1.9,16.21,4,21.07c2.27,1.86,5.06,3,7.56,4.5,10.69,6.56,14.77,21.95,8.74,32.94,5.41-4.44,10.41-9.67,13.16-16.1s3-14.25-.74-20.18c-1.63-2.6-3.93-4.72-5.82-7.14C693.51,401,695,384,700.2,370,693.44,375.37,687.72,382,689.91,379.82Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-10)"
                    fill="url(#radial-gradient-10)"
                    />
                    <path className="Animation-color" d="M1059,339.18c-4.91-8.45-3-18.09-.3-27.48s5.08-15.77,5.08-25.54c0-3.14-3-8-4.27-9.41,21.94,14.13,20.52,45.12,8.44,65.54-.82,1.4-2.23,2.95-3.76,2.42A18,18,0,0,1,1059,339.18Z" transform="translate(-627.19 -149.11)" 
                    // fill="url(#radial-gradient-10)"
                    fill="url(#radial-gradient-10)"
                    />
                </g>
        </svg>
        {/* <div className="Animation-textContainer u-flex"> */}
            <span className={textPos}></span>
        {/* </div> */}
        </div>
        </>
   )
}

export default Fire