const express = require("express");

const app = express();

const students = [
    { id: 1, name: "Shagun", course: "CSE" },
    { id: 2, name: "Aman", course: "IT" }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

app.listen(3000);