// 6 - Asynchronous JavaScript

const express = require('express');
const router = express.Router();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
app.get('env');

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3,name: 'course3'},
]
router.get('/', (req, res) => {
    res.send('Hello World');
})

router.post('/api/courses', (req, res) => {
    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create the course and return the course object
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.get('api/courses', (req, res) => {
    // const params = '?sortBy=name';
    const sortBy = req.query.sortBy;
    res.send(sortBy);
})

router.get('api/courses/:id', (req, res) => {
    // Lookup the course
    // If not found, return 404
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId))
    if (!course) return res.status(404).send('Course not found.');
    // Else, return the course object
    res.send(course);
})

router.put('api/courses/:id', (req, res) => {
    // If course not found, return 404, otherwise update it
    // and return the updated object.
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId));
    if (!course) return res.status(404).send('Course not found with this id.');

    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name;
    res.send(course);
});

router.delete('api/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId));
    // If course not found, return 404, otherwise delete it
    // and return the deleted object.
    const indexCourse = course.indexOf(course);
    courses.splice(indexCourse, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}
// Reading the port from an environment variable
const port = process.env.PORT || 3000; // Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));