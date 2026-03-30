app.post("/students", async (req, res) => {
  console.log("Incoming Data:", req.body);

  const { name, usn, branch, year, email } = req.body;

  if (!name || !usn || !email) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  try {
    const result = await supabase
      .from("students")
      .insert([{ name, usn, branch, year, email }]);

    if (result.error) {
      console.error(result.error);
      return res.status(500).json({ ok: false, error: result.error.message });
    }

    return res.json({ ok: true, message: "Student added" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});
