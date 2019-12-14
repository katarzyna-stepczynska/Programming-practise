// 5- Express - Advanced topic

// Build a web server
const Joi = require('joi'); // You should never trust data sent by the client. Always validate! Use Joi package to perform input validation.
const express = require('express');
const logger = require('./logger');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

// turn on parsing to json
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //it let to pass arrays and objects
// middleware function
app.use(function(req, res, next){
    console.log('Authentication...');
    next(); //it ending middleware function
});

if(app.get('env')==='development')
app.use(logger);

const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
]
app.get('/', (req, res) => {
    res.send('Hello World');
})
// Creating a course
app.post('/api/courses', (req, res) => {
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
// Getting all the courses
app.get('api/courses', (req, res) => {
    // const params = '?sortBy=name';
    const sortBy = req.query.sortBy;
    res.send(sortBy);
})
// Getting a single course
app.get('api/courses/:id', (req, res) => {
    // Lookup the course
    // If not found, return 404
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId))
    if (!course) return res.status(404).send('Course not found.');
    // Else, return the course object
    res.send(course);
})
// Updating a course
app.put('api/courses/:id', (req, res) => {
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
// Delete course
app.delete('api/courses/:id', (req, res) => {
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