import FormModel from "./formModel.js";

// @desc    submit form data
// @route   POST /api/form
const submitFormData = async (req, res) => {
  try {
    // Destructure the form data from the request body
    const { name, surname, idNumber, dateOfBirth } = req.body;

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
    console.error("Form submission error:", error);

    // Handle errors by sending error response
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ error: "An error occurred while submitting the form" })
    );
  }
};

export { submitFormData };
