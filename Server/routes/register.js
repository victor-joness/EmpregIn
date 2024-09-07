const express = require("express");
const router = express.Router();
import { RegisterAPI } from "../Utils/AuthAPI";
import { postUserData } from "../Utils/FirestoreAPI.JS";
const genAuthToken = require("../Utils/GenAuthToken");

const saltRounds = 10;

router.post("/", async (req, res) => {
  //to pegando todo o objeto, mas na verdade eu só preciso do email e da senha, mas é bom deixar como exemplo
  /* const userID = req.body.userID;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const img = req.body.img; */

  console.log(req.body);

  const user = {
    userID: req.body.userID,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    img: req.body.img,
  };

  bcript.hash(user.password, saltRounds, (err, hash) => {
    //salvar no BANCO apenas o hash da senha, e não ela em si
    const res = RegisterAPI(user.email, hash);

    //esse si é um early return, caso tenha algum erro, então esse error tem que vim do res que é a função que estamos utilizando para inserir no BD.
    if (err) {
      res.send(err);
    }

    //CONFERIR SE O ID QUE EU TO MANDANDO É O MESMO QUE TA INSERIDO NO BANCO DE DADOS.
    //aqui eu n posso passar o user direto para o GenAuthToken pq ele não ta esperando a senha, e no objeto user eu tenho a senha.
    res.send({
      msg: "Usuário cadastrado com sucesso",
      user: user,
      token: genAuthToken({
        userID: user.userID,
        name: user.name,
        email: user.email,
        img: user.img,
      }),
    });

    //tem que ver o caso onde já tem o email no banco de dados, ai tem que ver oque vem na res
  });
});

module.exports = router;
