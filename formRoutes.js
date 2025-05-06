import { Router } from "express";
import { submitForm } from "./formController.js";

const router = Router();

// POST /form - Handle form submission
router.post("/form", submitForm);

export default router;
