const fs = require("fs").promises;
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const readTodos = async () => {
  const data = await fs.readFile("./data.json");
  if (!data) {
    console.error("Error reading file");
    return;
  }
  return JSON.parse(data);
};

const writeTodos = async (newTodos) => {
  try {
    await fs.writeFile("./data.json", JSON.stringify(newTodos, null, 2));
    console.log("File written successfully");
  } catch (err) {
    console.error("Error writing file", err);
  }
};

app.get("/todos", async (req, res) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).send("Error reading todos");
  }
});

app.post("/todos", async (req, res) => {
  const newTodos = req.body;
  try {
    await writeTodos(newTodos);
    res.send("Todo added successfully");
  } catch (err) {
    res.status(500).send("Error writing todo");
  }
});

app.listen(PORT, () => {
  console.log(`Sever running on http://localhost:${PORT}`);
});
