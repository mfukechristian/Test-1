const form = document.getElementById("form");

// Helper: Validate name/surname (letters, spaces, hyphens, apostrophes only)
const isValidName = (name) => {
  const regex = /^[a-zA-Z\s\-']+$/;
  return regex.test(name);
};

// Helper: Validate date format and validity
const isValidDate = (day, month, year) => {
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1900 ||
    year > 2024
  ) {
    return false;
  }

  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input values
  const dayInput = document.getElementById("dob-day").value.trim();
  const monthInput = document.getElementById("dob-month").value.trim();
  const yearInput = document.getElementById("dob-year").value.trim();

  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const idNumber = document.getElementById("idnumber").value.trim();

  // Validate Name
  if (!name) {
    alert("Name is required.");
    return;
  }

  if (!isValidName(name)) {
    alert(
      "Name contains invalid characters. Please use only letters, spaces, hyphens (-), or apostrophes (')."
    );
    return;
  }

  // Validate Surname
  if (!surname) {
    alert("Surname is required.");
    return;
  }

  if (!isValidName(surname)) {
    alert(
      "Surname contains invalid characters. Please use only letters, spaces, hyphens (-), or apostrophes (')."
    );
    return;
  }

  // Validate DOB fields are filled
  if (!dayInput || !monthInput || !yearInput) {
    alert("Please fill in all date fields.");
    return;
  }

  // Convert to numbers
  const day = parseInt(dayInput);
  const month = parseInt(monthInput);
  const year = parseInt(yearInput);

  // Validate date
  if (!isValidDate(day, month, year)) {
    alert("Please enter a valid date.");
    return;
  }

  // Format date as dd/mm/yyyy
  const dateOfBirth = `${dayInput.padStart(2, "0")}/${monthInput.padStart(
    2,
    "0"
  )}/${yearInput}`;

  // Validate ID Number
  if (idNumber.length !== 13 || !/^\d+$/.test(idNumber)) {
    alert("ID number must be exactly 13 digits.");
    return;
  }

  // Build data object
  const sendData = {
    name,
    surname,
    idNumber: Number(idNumber),
    dateOfBirth,
  };

  // Send data to server
  try {
    const res = await fetch("http://localhost:5000/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });

    if (res.ok) {
      const result = await res.json();
      alert(result.message || "Form submitted successfully!");
      form.reset();
    } else {
      const errorData = await res.json().catch(() => ({}));
      alert("Failed to submit form: " + (errorData.error || "Unknown error"));
    }
  } catch (err) {
    alert("Failed to submit form. Please check your connection.");
    console.error(err);
  }
});
