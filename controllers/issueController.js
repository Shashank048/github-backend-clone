const mongoose = require('mongoose');
const Repository = require('../models/repoModel');
const Issue = require('../models/issueModel');
const User = require('../models/userModel');

async function createIssue  ( req, res)  {
    const { title , description } = req.body;
    const { id } = req.params;

    try{
    const issue = new issue({
        title,
        description,
        repository:id,
    });

    await issue.save();

    res.status(201).json(issue);
   } catch (err) {
    console.error("Error during issue creation: ", err);
    res.status(500).send("Server error!");
  }
};

async function updateIssueById  ( req, res){
    const { id } =  req.params;
    const { title , description , status} = req.body;
    try{
        const issue = await Issue.findById(id);

        if(!issue){
            return res.status(404).json({error: " Issue not found! "});

            issue.title = title;
            issue.description = description;
            issue.status = status;

            await issue.save();

            res.json(issue, { message: "Issue updated"});
        }
    }catch (err) {
    console.error("Error during issue updation: ", err);
    res.status(500).send("Server error!");
  }
};

async function deleteIssueById  ( req, res) {
   const id = req.params;
   try{
    const issue = Issue.findByIdAndDelete(id);

    if(!issue){
        return res.status(404).json({error: " Issue not found! "});
    }

    res.json({message: " Issue deleted"});
   }catch (err) {
    console.error("Error during issue updation: ", err);
    res.status(500).send("Server error!");
  }
}

async function getAllIssues ( req,res) {
    const {id} = req.params;

    try{

        const issue = Issue.findByIdAndDelete(id); 


        if(!issue){
            return res.status(404).json({error: " Issue not found! "});
        }

        res.json(issue);
    }catch (err) {
    console.error("Error during issue fetching: ", err);
    res.status(500).send("Server error!");
  }
}

async function getIssueById  ( req,res) {
   const { id } = req.params;
   try{

    const issue = await Issue.findById(id); 

    const issues = Issue.find({ repository: id});
    res.status(200).json(issues);
   }catch (err) {
   console.error("Error during issue fetching: ", err);
   res.status(500).send("Server error!");
} 
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById,
};
