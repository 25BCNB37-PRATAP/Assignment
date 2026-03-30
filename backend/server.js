const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// test route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// post route
app.post("/students", async (req, res) => {
  const { name, usn, branch, year, email } = req.body;

  if (!name || !usn || !email) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .insert([{ name, usn, branch, year, email }]);

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    return res.json({ ok: true, message: "Student added" });
  } catch (err) {
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running");
});
