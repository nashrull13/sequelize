'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    published_date: DataTypes.DATE,
    pages: DataTypes.INTEGER,
    language: DataTypes.STRING,
    publisher_id: DataTypes.STRING
  }, {});
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};