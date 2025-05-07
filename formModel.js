import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  idNumber: {
    type: Number,
    required: true,
    unique: true,
    validate: { validator: (value) => value.toString().length === 13 },
    message: (props) => `${props.value}`,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
});

const FormModel = mongoose.model("Form", formSchema);
export default FormModel;
