import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";

export default function Home() {
  const[search,setsearch]=useState('');

  const[foodCat,setfoodCat]=useState([]);
  const[foodItem,setfoodItem]=useState([]);

  const loadData=async()=>{
    let response=await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    });

    response=await response.json();

    setfoodItem(response[0]);
    setfoodCat(response[1]);
    // console.log(response);
  }

  useEffect(()=>{
    loadData()
  },[])







  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
      <div className='carousel-inner' id='carousel'>
      <div className='carousel-caption' style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
  <div className="carousel-inner">
    
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/300×300/?burgers" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300/?pastry" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/300×300/?barbeque" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
  </div> 
</div>
      </div>
        <div className="container">
        {
          foodCat !==[]?foodCat.map((data)=>{
            return(
            <div className="row mb-3">
              <div key={data.id} className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {foodItem !==[]?
              foodItem.filter((item)=>(item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
              .map(filterItems=>{
                return(
                  <div key={filterItems.id} className="col-12 col-md-6 col-lg-3">
                    <Card foodItem={filterItems}
                    options={filterItems.options[0]}
                    

                    ></Card>
                  </div>
                )
              }):
              <div>no such data found</div>}
            </div>
            )
          }):""
        }
        </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
