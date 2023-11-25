import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BoxList.css";
import { useNavigate } from "react-router-dom";
function BoxList() {
  const [boxList, setBoxList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/boxes");
      console.log(response.data);
      setBoxList(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (boxId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/boxes/" + boxId
      );
      alert(response.data);
      fetchData();
    } catch (error) {
      alert(error);
    }
  };

  const handleEdit = (boxId) => {
    navigate("/boxform/" + boxId);

  };

  return (
    <div>
     <center><table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Weight in KG</th>
            <th>Box color</th>
            <th>Destination Country</th>
            <th>Shipping cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {boxList.map((box) => {
            
            const clr = box.boxcolor; // Change 'box.color' to 'box.boxcolor'
    console.log("Color:", clr);
            let Cost;
            if (box.country === "Sweden") {
              Cost = 7.35;
            }
            else if (box.country === "China") {
              Cost = 11.53;
            }
            else if (box.country === "Brazil") {
              Cost = 15.63;
            }
            else if (box.country === "Australia") {
              Cost = 50.09;
            }
            const totalCost = Math.round(box.weight * Cost);
            return (
              <tr key={box._id}>
                <td>{box._id}</td>
                <td>{box.name}</td>
                <td>{box.weight}</td>
                <td>
                  <div style={{ backgroundColor: clr }} className="colors"></div>
                </td>
                <td>{box.country}</td>
                <td>{totalCost} INR</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(box._id)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(box._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </center> 
    </div>
  )
}

export default BoxList