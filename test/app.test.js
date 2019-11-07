const supertest = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("appointment app", () => {
  it("should return the list of current students", () => {
    supertest(app)
      .get("/api/students")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedStudents = [
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
          },]

        expect(res.body.students).to.deep.equal(expectedStudents);
      });
  });

  it("should return a student by id", () => {
    supertest(app)
      .get("/api/students/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedStudent = { id: "1", 
          firstName: "Alma", 
          lastName: "Marcela", 
          age: "21" ,
        };

        expect(res.body).to.deep.equal(expectedStudent);
      });
  });

  it("should return 404 when you try to find a non existent student by id", () => {
    supertest(app)
      .get("/api/students/100")
      .expect(404)
      .end((err, res) => {
        if (err) {
          throw err;
        }
      });
  });

  it("should create a new student and return the recently created student in the response", () => {
    supertest(app)
      .post("/api/students")
      .send({
        firstName: "Aquiles",
        lastName: "Pico",
        age:"25",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedFirstName = "Aquiles";
        const expectedLastName = "Pico";
        const expectedAge = "25";

        expect(res.body.student.id).to.be.ok;
        expect(res.body.student.firstName).to.equal(expectedFirstName);
        expect(res.body.student.lastName).to.equal(expectedLastName);
        expect(res.body.student.age).to.equal(expectedAge);
      });
  });

  it("should try to create a new student with empty data and return an error", () => {
    supertest(app)
      .post("/api/students")
      .send({
        firstName: "",
        lastName: "",
        age: "",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should try to create a new student with undefined data and return an error", () => {
    supertest(app)
      .post("/api/students")
      .send({
        firstName: undefined,
        lastName: undefined,
        age: undefined,
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should delete an existing student", () => {
    supertest(app)
      .delete("/api/students/1")
      .expect(204)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should try to delete a non existing student and return an error", () => {
    supertest(app)
      .delete("/api/students/100")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should update an existing student and return the updated version", () => {
    supertest(app)
      .put("/api/students/2")
      .send({ 
        firstName: "Ran",
        lastName: "Out of",
        age: "Ideas" 
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const expectedFirstName = "Ran";
        const expectedLastName = "Out of";
        const expectedAge = "Ideas";

        expect(res.body.student.id).to.be.ok;
        expect(res.body.student.firstName).to.equal(expectedFirstName);
        expect(res.body.student.lastName).to.equal(expectedLastName);
        expect(res.body.student.age).to.equal(expectedAge);
      });
  });

  it("should try to update an existing student with an empty name and return an error", () => {
    supertest(app)
      .put("/api/students/2")
      .send({ firstName: "" })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should try to update an existing student with an undefined name and return an error", () => {
    supertest(app)
      .put("/api/students/2")
      .send({ firstName: undefined })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });

  it("should try to update a non existing event and return an error", () => {
    supertest(app)
      .put("/api/students/8")
      .send({ firstName: "Another student name" })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res.body).to.be.deep.equal({});
      });
  });
});
