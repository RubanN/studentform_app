const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors("*"))
app.use(bodyParser.json());

app.get('/api/students', (req, res) => {
  const students = JSON.parse(fs.readFileSync('students.json'));
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const students = JSON.parse(fs.readFileSync('students.json'));
  const student = students.find(s => s.id === studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  const students = JSON.parse(fs.readFileSync('students.json'));
  newStudent.id = generateUniqueId();
  students.push(newStudent);

  fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;
  const students = JSON.parse(fs.readFileSync('students.json'));
  const index = students.findIndex(s => s.id === studentId);

  if (index !== -1) {
    students[index] = { ...students[index], ...updatedStudentData };
    fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
    res.json(students[index]);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.delete('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  const students = JSON.parse(fs.readFileSync('students.json'));
  const index = students.findIndex(s => s.id === studentId);

  if (index !== -1) {
    const deletedStudent = students.splice(index, 1)[0];
    fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
    res.json(deletedStudent);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateUniqueId() {

}
