import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './BoxForm.css'

function BoxForm() {

    const [weight,setWeight] = useState("");
    const [name,setName] = useState("");
    const [boxcolor,setBoxcolor] = useState("");
    const [country,setCountry] = useState("");

    const [boxId, setBoxId] = useState(null);

  const params = useParams();
  
  console.log(params);

  useEffect(() => {
    if(params && params.id){
      setBoxId(params.id);
      getBoxById(params.id);
    }else{
      setBoxId(null);
    }
  }, [params]);

  const getBoxById = async (boxId) => {
    try {
      const response = await axios.get("http://localhost:5000/boxes/" + boxId);
      const orderData = response.data;

      setName(orderData.name);
      setBoxcolor(orderData.boxcolor);
      setCountry(orderData.country);
      setWeight(orderData.weight);
    } catch (error) {
      alert(error);
    }
  };

    const HandleInput= async (e)=>{
        e.preventDefault();
        const data={
            weight:weight,
            name:name,
            boxcolor:boxcolor,
            country:country,
        } ;
         console.log(data);

        //  send data to api
        try {
          let response;
          if(boxId){
            //edit the student
            response = await axios.put("http://localhost:5000/boxes/" + boxId, data);
          }else{
            //creating the user
            response = await axios.post("http://localhost:5000/boxes", data);
          }
          alert(response.data);
        } catch (error) {
          alert(error);
        }
    
    };
    
    


  return (
    <div className="Reg">
    <h2>Add Box</h2>
    <form onSubmit={HandleInput}>
    <div className="field">
      <label>Name</label>
        <input type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e)=>setName(e.target.value)}
        pattern="[a-zA-Z]+"
        title="No digits or special characters allowed"
        required/>
      </div>
      <div className="field">
      <label>Weight</label>
        <input type="number" 
        placeholder="Enter the box weight in Kilograms" 
        value={weight} 
        pattern="^[0-9]*\.?[0-9]+$"
        title="Negative numbers not allowed"
        onChange={(e)=>setWeight(e.target.value)} 
        required/>
      </div>
      <div className="field">
      <label>Box color</label>
        <input type="color" 
        className='color'
        placeholder="Choose a color" 
        value={boxcolor} 
        onChange={(e)=>setBoxcolor(e.target.value)} 
        required/>
      </div>
      <div className="field">
      <label>Destination Country</label>
        <select name='country' value={country} onChange={(e)=>setCountry(e.target.value)} required>
          <option value=''>Select a country</option>
          <option value='Sweden'>Sweden</option>
          <option value='China' >China</option>
          <option value='Brazil'>Brazil</option>
          <option value='Australia'>Australia</option>
          
        </select>
      </div>
        <button>Save</button>
    </form>
</div>
  )
}

export default BoxForm