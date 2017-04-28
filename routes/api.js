 /*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var Issue = require('../issue-model');
var mongoose = require('mongoose');

const CONNECTION_STRING = process.env.DB; 

mongoose.connect(CONNECTION_STRING);

module.exports = function (app) {

  
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
      Issue.find(req.query, function (err, issues){
        if (err) return;
        res.json(issues);
      });
    })
  
    .post(function (req, res){
    console.log(req.body.issue_title);
    if (!req.body.issue_title || !req.body.issue_text
        || !req.body.created_by){
      res.send('missing inputs');
    } else {
          
     const newIssue = new Issue({issue_title:req.body.issue_title, 
                                 issue_text:req.body.issue_text, 
                                 created_on: new Date(),
                                 updated_on: new Date(),
                                 created_by: req.body.created_by,
                                 assigned_to: req.body.assigned_to || '',
                                 open: true,
                                 status_text: req.body.status_text || ''
                                 });
      newIssue.save();
      res.json(newIssue);
    }
    })
    
    .delete(function (req, res){
    if (!req.body._id) res.send('_id error');
    Issue.findById(req.body._id, function(err, foundIssue){
    if (err) return;
    if (foundIssue){
      foundIssue.remove();
      res.send(`deleted ${req.body._id}`);
      
    } else {
      res.send(`could not delete ${req.body._id}`);
    }
    
                  });
    })
    
    .put(function (req, res){
      Issue.findById(req.body._id, function(err, foundIssue){
    if (err) return;
    if (foundIssue){
     
      if (!req.body.issue_title && !req.body.issue_text && !req.body.created_by
          && !req.body.assigned_to && !req.body.status_text && !req.body.open){
        res.send('no updated field send');
      } else {
      foundIssue.issue_title = req.body.issue_title || foundIssue.issue_title;
      foundIssue.issue_text = req.body.issue_text || foundIssue.issue_text;
      foundIssue.updated_on = new Date();
      foundIssue.created_by = req.body.created_by || foundIssue.created_by;
      foundIssue.assigned_to = req.body.assigned_to || foundIssue.assigned_to;
      foundIssue.status_text = req.body.status_text || foundIssue.status_text;
      foundIssue.open = !req.body.open;
      foundIssue.save();
      //res.json(foundIssue);
      res.send('successfully updated');
      }
    } else {
      res.send(`could not update ${req.body._id}`);
    }
      });
    });
    

};