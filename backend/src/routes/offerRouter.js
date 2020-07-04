const express = require("express");
const { body } = require("express-validator");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const authorizeUser = require("../middlewares/authorizeCandidate");
const router = express.Router();

const offerController = require("../controllers/offerController");

//CREAR OFERTA
router.post(
  "/",
  authorizeAdmin("admin"),
  [
    body("title", "Debe incluir un titulo").notEmpty(),
    body("summary", "Debe incluir un resumen").notEmpty(),
    body("description", "Debe incluir una descripción").notEmpty(),
    body("profession", "Debe incluir una profesión").notEmpty(),
    body("workplace", "Ddebe incluir lugar de trabajo").notEmpty(),
    body("quota", "Debe agregar un cupo").notEmpty(),
    body("categories", "Debe agregar una categoria").notEmpty(),
  ],
  offerController.createOffer
);

//LISTAR TODAS LAS OFERTAS
router.get("/admin/all",authorizeAdmin("admin"), offerController.getAllOffers);

//LISTAR TODAS LAS OFERTAS ACTIVAS
router.get("/candidate/all",authorizeUser("user"), offerController.getAllOffersActive);

//MOSTRAR UNA OFERTA
router.get("/:OfferId",authorizeUser("user"), offerController.getOffer);


module.exports = router;
