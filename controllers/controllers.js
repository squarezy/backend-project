const res = require("express/lib/response");
const { getTopics, getArticle, updateVotes } = require("../models/models");

exports.returnTopics = async (req, res, next) => {
  try {
    const results = await getTopics();
    res.send(results).status(200);
  } catch (err) {
    next(err);
  }
};

exports.returnArticle = async (req, res, next) => {
  try {
    const articleID = req.params.article_id;
    const results = await getArticle(articleID);
    if (results != undefined) {
      res.send(results).status(200);
    } else
      res
        .status(404)
        .send({ msg: "An article with provided article ID does not exist" });
  } catch (err) {
    next(err);
  }
};

exports.addVotesToArticle = async (req, res, next) => {
  try {
    const articleID = req.params.article_id;
    const voteNum = Number(req.body.inc_votes);
    const results1 = await getArticle(articleID);
    if (results1 === undefined) {
      res
        .status(404)
        .send({ msg: "An article with provided article ID does not exist" });
    }
    const results2 = await updateVotes(articleID, voteNum);
    res.send(results2).status(200);
  } catch (err) {
    next(err);
  }
};