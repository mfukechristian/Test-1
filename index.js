const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    idNumber: document.getElementById("idnumber").value, // Make sure this matches the ID in your HTML
    dateOfBirth: document.getElementById("dob").value,
  };

  try {
    const res = await fetch("http://localhost:5000/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const result = await res.json();
      alert(result.message || "Form submitted.");
      form.reset(); // Reset the form on success
    } else {
      const errorData = await res.json().catch(() => ({}));
      alert("Failed to submit form: " + (errorData.error || "Unknown error"));
    }
  } catch (err) {
    alert("Failed to submit form. Please check your connection.");
    console.error(err);
  }
});
