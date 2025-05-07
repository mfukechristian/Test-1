const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get values from all three date fields
  const dayInput = document.getElementById("dob-day").value.trim();
  const monthInput = document.getElementById("dob-month").value.trim();
  const yearInput = document.getElementById("dob-year").value.trim();

  // Validate that all fields are filled
  if (!dayInput || !monthInput || !yearInput) {
    alert("Please fill in all date fields.");
    return;
  }

  // Validate numeric values
  if (isNaN(dayInput) || isNaN(monthInput) || isNaN(yearInput)) {
    alert("Date fields must be valid numbers.");
    return;
  }

  // Convert to integers
  const day = parseInt(dayInput);
  const month = parseInt(monthInput);
  const year = parseInt(yearInput);

  // Validate range
  if (
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > 2024
  ) {
    alert("Please enter a valid date.");
    return;
  }

  // Create Date object to check validity
  const date = new Date(year, month - 1, day);
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    alert("Invalid date entered.");
    return;
  }

  // Format as "dd/mm/yyyy"
  const dateOfBirth = `${dayInput.padStart(2, "0")}/${monthInput.padStart(
    2,
    "0"
  )}/${yearInput}`;

  // Collect other form data
  const data = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    idNumber: Number(document.getElementById("idnumber").value),
    dateOfBirth: dateOfBirth,
  };

  // Optional: Validate ID number again before sending
  if (isNaN(data.idNumber) || data.idNumber.toString().length !== 13) {
    alert("ID number must be a 13-digit number.");
    return;
  }

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
      alert(result.message || "Form submitted successfully!");
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
