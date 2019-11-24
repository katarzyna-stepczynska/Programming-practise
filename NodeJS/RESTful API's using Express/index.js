// Build a web server
const express = require('express')
const app = express()

const  courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]
app.get('/', (req, res) => {
  res.send('Hello World')
})
// Creating a course
app.post('/api/courses', (req, res) => {
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
    courses = 
    res.send(sortBy);
})
// Getting a single course
app.get('api/courses/:id', (req, res) => {
    // Lookup the course
    // If not found, return 404
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId))
    if(!course) res.status(404).send('Course not found.');
    // Else, return the course object
    res.send(course); 
})
// Updating a course
app.put('api/courses/:id', (req, res) => {
    // If course not found, return 404, otherwise update it
    // and return the updated object.
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId))
    if(!course) res.status(404).send('Course not found.');
    res.send(course); 
})
// Reading the port from an environment variable
const port = process.env.PORT || 3000; // Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));