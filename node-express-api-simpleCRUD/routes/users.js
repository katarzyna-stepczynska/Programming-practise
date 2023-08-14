import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];
//example database is in user.json to copy in postman with POST, but id for user must be generated when POST

//all routers here start with /users
router.get("/", (req, res) => {
  console.log(`GET all ${users}`);
  res.send(users);
});

router.post("/", (req, res) => {
  console.log(`POST route reached`);
  console.log(req.body);

  const user = req.body;
  const userId = uuidv4();
  const userWithId = { ...user, id: userId };

  users.push(userWithId);

  res.send(`User with the name ${user.firstName} added to the database`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
  res.send(`${foundUser}`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);

  res.send(`User with id: ${id} deleted from the database`);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const userToBeUpdated = users.find((user) => user.id === id);

  if (firstName) {
    userToBeUpdated.firstName = firstName;
  }
  if (lastName) {
    userToBeUpdated.lastName = lastName;
  }
  if (age) {
    userToBeUpdated.age = age;
  }

  res.send(`User with the id: ${id} has been updated`);
});

export default router;
