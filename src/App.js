import React, { useState, useEffect } from 'react';
import StudentForm from './studentform/StudentForm';
import "./App.css"
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/students') 
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data)
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='home-container'>
      <h1>Student Data</h1>
      <StudentForm/>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Major</th>
      <th>GPA</th>
      <th>Phone Number</th>
    </tr>
  </thead>
  <tbody>
    {data.map((value) => (
      <tr key={value.id}>
        <td>{value.id}</td>
        <td>{value.name}</td>
        <td>{value.email}</td>
        <td>{value.major}</td>
        <td>{value.gpa}</td>
        <td>{value.phoneNumber}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default App;
