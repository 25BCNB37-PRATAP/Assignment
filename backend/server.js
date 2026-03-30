const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());


// 👇 ADD THIS RIGHT HERE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});


// 👇 KEEP THIS BELOW
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

    res.json({ ok: true, message: "Student added" });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Server error" });
  }
});
