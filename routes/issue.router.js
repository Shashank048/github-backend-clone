const express = require("express");
const issueController = require("../controllers/issueController");

const issueRouter = express.Router();

// Corrected route definitions to use issueController methods
issueRouter.post("/issue", issueController.createIssue);
issueRouter.put("/issue/update/:id", issueController.updateIssueById);
issueRouter.delete("/issue/delete/:id", issueController.deleteIssueById);
issueRouter.get("/issue/All", issueController.getAllIssues);
issueRouter.get("/issue/:id", issueController.getIssueById);

module.exports = issueRouter;
