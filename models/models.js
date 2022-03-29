const db = require("../db/connection");

exports.getTopics = async () => {
  const results = await db.query("SELECT * FROM topics");
  return results.rows;
};

exports.getArticle = async (articleID) => {
  articleID = Number(articleID);
  const results = await db.query("SELECT * FROM articles");

  const articleArr = results.rows.filter((article) => {
    if (article.article_id === articleID) {
      return article;
    }
  });
  return articleArr[0];
};

exports.updateVotes = async (articleID, voteNum) => {
  articleID = Number(articleID);
  const results = await db.query("SELECT * FROM articles");

  const articleArr = results.rows.filter((article) => {
    if (article.article_id === articleID) {
      return article;
    }
  });
  articleArr[0].votes += voteNum;
  return articleArr[0];
};