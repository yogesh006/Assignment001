import {useEffect, useState} from "react";
import "./App.css"
function App() {


 const [datas, setDatas] = useState([]);

 const itemPage = 5;

 const [currentPage, setCurrentPage] = useState(1);
 
 const totalPage = Math.ceil(datas.length / itemPage)

 const startI = (currentPage-1)*itemPage;
 const endI = startI+itemPage;
 const currentItem = datas.slice(startI, endI);

 console.log("these are the currentItem in a page ", currentItem)

 const fetchData = async ()=>{

  const response = await fetch(`https://fakestoreapi.com/products`)
  const data = await response.json()
  setDatas(data)
  console.log(data)
 
 }

 const handleClick=(type)=>{

      if(type === "prev"){
        setCurrentPage((prev)=> (prev===1 ? prev: prev-1))
      }
      else if(type === "next"){
        setCurrentPage((prev) => (prev=== totalPage ? prev: prev+1))
      }

 }


  useEffect(()=>{

    fetchData()
    // fetch(`https://fakestoreapi.com/products`)
    // .then(response=> response.json())
    // .then(data=> {
    //   setDatas(data)
    //   console.log(data)
    // }
    // )
    // .catch((err)=> console.log(err))

    const timer= setTimeout(() => {
      window.location.reload();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };

  },[])
    


  // useEffect(()=>{
    
  //   const timer = setTimeout(()=>{
  //     window.location.reload()
  //   },5000)

  //   return ()=> clearTimeout(timer)
  // },[])
  return (

    <div>
      <table>
        <thead>
          <tr>
          <th>Id</th>
          <th>Category</th>
          <th>Title</th>
          <th>Image</th>
          </tr>
        </thead>
        
        <tbody>
          {currentItem.map((user)=>(
              
                <tr key={user.id}>
                  <td>
                    {user.id}
                  </td>
                  <td>
                    {user.category}
                  </td>
                  <td>
                    {user.title}
                  </td>
                  <td>
                    <img src={user.image} alt="image_txt"  style={{width:'100px'}}/>
                   
                  </td>
                </tr>
              

          ))}
        </tbody>
      </table>

        <div className="buttons">
          <button className="prev-button" onClick={()=> handleClick("prev") }>Prev</button>
          <button className="next-button" onClick={()=> handleClick("next")}>Next</button>
        </div>

      </div>
  
  );
}

export default App;
