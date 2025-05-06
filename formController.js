import FormModel from "./formModel.js";

// @desc    submit form data
// @route   POST /api/form
const submitFormData = async (req, res) => {
  try {
    const { name, surname, idNumber, dateOfBirth } = req.body;

    const newForm = new FormModel({
      name,
      surname,
      idNumber,
      dateOfBirth,
    });

    await newForm.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while submitting the form" });
  }
};

export { submitFormData };
