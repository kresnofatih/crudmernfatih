import './App.css';
import React, {useState, useEffect} from 'react'
import Axios from 'axios' 

function App() {
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [newFoodName, setNewFoodName] = useState('')
  
  useEffect(()=>{
    Axios.get('http://localhost:3001/read').then((response)=>{
      setFoodList(response.data.map(food=>food));
    })
  }, [])

  const addToList = ()=>{
    Axios.post('http://localhost:3001/add', {
      foodName: foodName, days: days
    });
    setFoodName('');
    setDays(0);
  }

  const updateFood = (id)=>{
    Axios.put('http://localhost:3001/update', {
      id: id,
      newFoodName: newFoodName
    })
  }

  const deleteFood = (id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  return (
    <div className="App">
      <div className="foodform">
        <h2>MERN FoodApp</h2>
        <h3>foodname</h3>
        <input type="text" onChange={e=>setFoodName(e.target.value)} value={foodName}/>
        <h3>daysSinceEaten</h3>
        <input type="number" onChange={e=>setDays(e.target.value)} value={days}/>
        <label className="submitbtn" onClick={addToList}>Add to db</label>
      </div>
      <hr></hr>
      {foodList.map(foodItem=>(
        <div key={foodItem._id}>
          <h2>{'foodItem: '+foodItem.foodName}</h2>
          <input
          type="text"
          placeholder=""New Food Name
          onChange={e=>setNewFoodName(e.target.value)}/>
          <label onClick={()=>updateFood(foodItem._id)}>update</label>
          <h4>{'days: '+foodItem.daysSinceEaten}</h4>
          <label onClick={()=>deleteFood(foodItem._id)}>delete</label>
        </div>
      ))}
    </div>
  );
}

export default App;
