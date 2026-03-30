const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// POST route
app.post("/students", async (req, res) => {
  console.log("Incoming Data:", req.body);

  const { name, usn, branch, year, email } = req.body;

  if (!name || !usn || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .insert([{ name, usn, branch, year, email }]);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ ok: true, message: "Student added", data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
