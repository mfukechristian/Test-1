import FormModel from "./formModel.js";

const isValidName = (name) => {
  const regex = /^[a-zA-Z\s\-']+$/;
  return typeof name === "string" && regex.test(name);
};

const isValidDate = (dateString) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
};

// @desc    Submit form data
// @route   POST /api/form
const submitFormData = async (req, res) => {
  try {
    const { name, surname, idNumber, dateOfBirth } = req.body;

    if (!name || !isValidName(name)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error:
            "Name is required and must contain only letters, spaces, hyphens (-), or apostrophes (').",
        })
      );
    }

    if (!surname || !isValidName(surname)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error:
            "Surname is required and must contain only letters, spaces, hyphens (-), or apostrophes (').",
        })
      );
    }

    if (typeof idNumber !== "number" || idNumber.toString().length !== 13) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error: "ID number must be a numeric value with exactly 13 digits.",
        })
      );
    }

    if (!dateOfBirth || !isValidDate(dateOfBirth)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error:
            "Date of birth must be in dd/mm/yyyy format and represent a valid date.",
        })
      );
    }

    const newForm = new FormModel({
      name,
      surname,
      idNumber,
      dateOfBirth,
    });

    await newForm.save();

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Form submitted successfully" }));
  } catch (error) {
    console.error("Error:", error);

    if (error.name === "ValidationError") {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    } else if (error.code === 11000) {
      res.writeHead(409, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "ID number already exists." }));
    } else {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Server error." }));
    }
  }
};

// @desc    Get all form records
// @route   GET /api/form
const getAllFormData = async (req, res) => {
  try {
    const forms = await FormModel.find(); // Get all documents
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(forms));
  } catch (error) {
    console.error("Error fetching data:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to retrieve form data." }));
  }
};

export { submitFormData, getAllFormData };
