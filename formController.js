import FormModel from "./formModel.js";

// @desc    submit form data
// @route   POST /api/form
const submitFormData = async (req, res) => {
  try {
    // Destructure the form data from the request body
    const { name, surname, idNumber, dateOfBirth } = req.body;

    if (typeof idNumber !== "number" || idNumber.toString().length !== 13) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error: "ID number must be a numeric value with exactly 13 digits.",
        })
      );
    }

    // Create a new form entry
    const newForm = new FormModel({
      name,
      surname,
      idNumber,
      dateOfBirth,
    });

    // Save the form data to MongoDB
    await newForm.save();

    // Send success response
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

export { submitFormData };
