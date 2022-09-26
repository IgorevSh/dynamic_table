import TableController from "../controllers/TableController.js"
import { Router } from "express";

let router = new Router();
router.get(
    "/rows",TableController.getRows);
router.post(
    "/add",TableController.addRow);

export default router;
