var model = require("../models/index");
const express = require("express");

module.exports = function(app) {
  /* GET books listing. */
  app.get("/books", function(req, res, next) {
    model.books
      .findAll({})
      .then(books =>
        res.status(201).json({
          error: false,
          data: books
        })
      )
      .catch(error =>
        res.status(401).json({
          error: true,
          data: [],
          error: error
        })
      );
  });

  /* GET books id. */
  app.get("/books/:id", function(req, res, next) {
    const books_id = req.params.id;
    model.books
      .findAll({
        where: {
          id: books_id
        }
      })
      .then(books =>
        res.status(201).json({
          error: false,
          data: books
        })
      )
      .catch(error =>
        res.status(401).json({
          error: true,
          data: [],
          error: error
        })
      );
  });
  /* POST books. */
  app.use(express.json());
  const { check, validationResult } = require("express-validator");

  app.post(
    "/books",
    [
      check("title")
        .notEmpty()
        .withMessage("title is empty"),
      check("author")
        .notEmpty()
        .withMessage("author is empty"),
      check("published_date"),
      check("pages")
        .notEmpty()
        .withMessage("pages is empty"),
      check("language")
        .notEmpty()
        .withMessage("language is empty"),
      check("publisher_id")
        .notEmpty()
        .withMessage("publisher_id is empty")
    ],
    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      const {
        title,
        author,
        published_date,
        pages,
        language,
        publisher_id
      } = req.body;
      model.books
        .create({
          title: title,
          author: author,
          published_date: published_date,
          pages: pages,
          language: language,
          publisher_id: publisher_id
        })
        .then(books =>
          res.status(201).json({
            error: false,
            data: books,
            message: "New books has been added."
          })
        )
        .catch(error =>
          res.status(401).json({
            error: true,
            data: [],
            error: error
          })
        );
    }
  );

  /* update books. */
  app.put(
    "/books/:id",
    [
      check("title")
        .notEmpty()
        .withMessage("title is empty"),
      check("author")
        .notEmpty()
        .withMessage("author is empty"),
      check("published_date"),
      check("pages")
        .notEmpty()
        .withMessage("pages is empty"),
      check("language")
        .notEmpty()
        .withMessage("language is empty"),
      check("publisher_id")
        .notEmpty()
        .withMessage("publisher_id is empty")
    ],
    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
      }
      const books_id = req.params.id;
      const {
        title,
        author,
        published_date,
        pages,
        language,
        publisher_id
      } = req.body;
      model.books
        .update(
          {
            title: title,
            author: author,
            published_date: published_date,
            pages: pages,
            language: language,
            publisher_id: publisher_id
          },
          {
            where: {
              id: books_id
            }
          }
        )

        .then(books =>
          res.status(201).json({
            error: false,
            message: "books has been updated."
          })
        )
        .catch(error =>
          res.status(401).json({
            error: true,
            error: error
          })
        );
    }
  );

  /* GET books listing. */

  /* Delete books. */
  app.delete("/books/:id", function(req, res, next) {
    const books_id = req.params.id;
    model.books
      .destroy({
        where: {
          id: books_id
        }
      })
      .then(status =>
        res.status(201).json({
          error: false,
          message: "books has been delete."
        })
      )
      .catch(error =>
        res.status(401).json({
          error: true,
          error: error
        })
      );
  });
};
