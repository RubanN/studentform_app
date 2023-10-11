import React, { useState } from 'react';
import "./studentform.css";

const StudentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [major, setMajor] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('')
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      major: major,
    };
    if(name.trim().length<=0 && email.trim().length<=0 &&  phoneNumber.trim().length<0){
        alert('Please fill all the fields');
    }else{
        fetch('http://localhost:3001/api/students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                setName('');
                setEmail('');
                setMajor('');
              } else {
                console.error('Error posting data:', response.statusText);
              }
            })
            .catch((error) => console.error('Error posting data:', error));
    }

   
  };
  const handleDelete = () => {
    const studentName = name;
    fetch(`http://localhost:3001/api/students/${studentName}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json',},
    })
      .then((response) => {
        if (response.ok) {
          setName('');
          setEmail('');
          setMajor('');
          setPhoneNumber('');
        } else {
          console.error('Error deleting student:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting student:', error));
  };


  return (
<div className='parentContainer'>
<div className='container'>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input required placeholder='enter your name' type="text" value={name} onChange={handleNameChange} />
        <label>Email</label>
        <input required type="text" placeholder='enter your Email' value={email} onChange={handleEmailChange} />
        <label>Major</label>
        <input required type="text" placeholder='enter your major' value={major} onChange={handleMajorChange} />
        <label>Phone Number</label>
        <input required type="text" placeholder='enter your number' value={phoneNumber} onChange={handlePhoneNumber} />
        <div className='button_container'>
        <button type="submit">Submit</button>
        <button type="submit" onClick={handleDelete}>Delete</button>
        </div>
        
      </form>
    </div>
    </div>
    
  );
};

export default StudentForm;
