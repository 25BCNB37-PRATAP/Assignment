app.post("/students", async (req, res) => {
  console.log("Incoming Data:", req.body);

  const { name, usn, branch, year, email } = req.body;

  if (!name || !usn || !email) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase
      .from("students")
      .insert([{ name, usn, branch, year, email }]);

    if (error) {
      console.error(error);
      return res.status(500).json({ ok: false, error: error.message });
    }

    res.json({ ok: true, message: "Student added", data });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});
