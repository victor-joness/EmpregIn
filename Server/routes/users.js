const express = require("express");
const router = express.Router();

//exemplo de post normal -> fazer requisição -> http://localhost:5005/api/{name}
router.post("/", async (req, res) => {});

//exemplo de get -> fazer requisição -> http://localhost:5005/api/{name}/get{Name}
router.post("/get{Name}", async (req, res) => {});

//exemplo de put -> fazer requisição passando o id -> http://localhost:5005/api/{name}/10
router.put("/:id", async (req, res) => {});

module.exports = router;