const { Router } = require("express");
const cuid = require("cuid");

let students = [
  { id: "1", 
    firstName: "Alma", 
    lastName: "Marcela", 
    age: "21" ,
  }, 
  { id: "2", 
    firstName: "Elbert" ,
    lastName: "Galarga" ,
    age: "22" ,
  },
  { id: "3", 
    firstName: "Tomás" ,
    lastName: "Turbado" ,
    age: "23" ,
  },
  { id: "4", 
    firstName: "Zacarias" ,
    lastName: "La Grande" ,
    age: "24" ,
  },];

function validateStudent(req, res, next) {
  const student = req.body;

  if (student.lastName === undefined || student.lastName === "" || 
      student.firstName === undefined || student.firstName === "" ||
      student.age === undefined || student.age === "") {
    return res.status(400).json({});
  }

  next();
}

const StudentRouter = Router();

StudentRouter.get("/", (req, res) => {
  res.json({
    students,
  });
});

StudentRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex(student => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).end();
  }

  const student = students[studentIndex];
  res.json(student);
});

// Controller - Function that returns the result of an succesfull action
StudentRouter.post("/", validateStudent, (req, res) => {
  const student = req.body;
  const newStudent = {
    ...student,
    id: cuid(),
  };

  students.push(newStudent);
  res.status(201).json({ student: newStudent });
});

StudentRouter.put("/:id", validateStudent, (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const studentIndex = students.findIndex(student => student.id === id);

  if (studentIndex === -1) {
    return res.status(400).json({});
  }

  students[studentIndex] = {
    ...students[studentIndex],
    firstName,
    lastName,
    age,
  };

  res.status(200).json({
    student: students[studentIndex],
  });
});

StudentRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex(student => student.id === id);

  // student not found
  if (studentIndex === -1) {
    return res.status(400).json({});
  }

  students = students.filter(student => student.id !== id);
  res.status(204).json({});
});

module.exports = StudentRouter;
