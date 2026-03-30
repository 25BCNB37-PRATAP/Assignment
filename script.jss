const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    usn: document.getElementById("usn").value.trim(),
    branch: document.getElementById("branch").value.trim(),
    year: document.getElementById("year").value.trim(),
    email: document.getElementById("email").value.trim()
  };

  if (!data.name || !data.usn || !data.email) {
    alert("Please fill required fields!");
    return;
  }

  try {
    const res = await fetch("https://student-backend-uk6s.onrender.com/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      alert("Submitted successfully!");
      form.reset();
    } else {
      alert("Error: " + result.error);
    }

  } catch (err) {
    console.error(err);
    alert("Server error!");
  }
});
