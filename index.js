const express = require("express");
const cors = require("cors");
const { DataTypes } = require("sequelize");
const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("Database connected."))
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });

const Employee = sequelize.define(
  "Employee",
  {
    id: { //recid
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: { //fname
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: { //lname
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { //email
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    jobTitle: { //emptitle
      type: DataTypes.STRING,
    },
    salary: { //precomsal
      type: DataTypes.DECIMAL(10, 2),
    },
    startDate: { //hiredate
      type: DataTypes.DATE,
    },
    signatureCatchPhrase: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

sequelize
  .sync({ force: true }) // This will drop the table first if it already exists
  .then(() => console.log("Employee table created successfully"))
  .catch((err) => console.error("Error creating table:", err));

// Define routes
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/employees", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.update(req.body, { where: { id } });
    const updatedEmployee = await Employee.findByPk(id);
    res.json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});
