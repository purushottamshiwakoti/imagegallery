import React ,{useEffect, useState} from "react";
import axios from "axios";
import {ACCESS_KEY} from './config/constants'
function App() {
  const[image,setImage]=useState([]);
  const[tempImage,setTempImage]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  
  const SearchList=(query)=>{
    if(query===""){
      setImage(tempImage)
    }
    else{
   const filteredImagelist= image.filter(images=>{
      images.alt_description=images.alt_description===null?"Pictures":images.alt_description;
      return images.alt_description.includes(query);
     
    })
    setImage(filteredImagelist)
  }
  }
  useEffect(()=>{
    document.title="Image Gallery"
    axios.get(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=300`).then((response)=>{
      
    setTempImage(response.data)
    setImage(response.data)})
    setIsLoading(false)

  },[]);
  return (
    <div >
      <center>
        <input type="text"  placeholder="Search Images" onChange={(e)=>SearchList(e.target.value)} style={{height:"40px", width:"50%",borderRadius:"10px" ,outline:"none",padding:"10px"}}  />
      </center>

      {isLoading? "Loading...":null}
     <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center", padding:"20px"}}>
      {image.length>0?image.map((images)=>{
        return <div key={images.id}><img src={images.urls.regular} alt={images.alt_description} style={{height:"250px", width:"250px", objectFit:"cover",padding:"20px"}}
       
        
        />
         <br />
        <div style={{textAlign:"center"}}>
        {images.alt_description?images.alt_description.substring(0,30):"Pictures"}
        </div>
        
         </div>
      }):isLoading?"Loading...":"No images found"}
     </div>
    </div>
  );
}

export default App;
