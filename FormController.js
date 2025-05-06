import FormModel from "./formModel.js";

/**
 * Create and save a new form entry
 */
export const submitForm = async (req, res) => {
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
