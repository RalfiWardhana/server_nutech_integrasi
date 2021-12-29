const{Router} = require("express");
const router = Router();
const {auth} = require("../../middleware/verify")
const {uploadFile} = require("../../middleware/upload")

const{login,register} = require("../controllers/auth")
const{addBarang,getBarangs,updateBarang,getBarang,deleteBarang}=require("../controllers/barang")

router.post("/login",login)
router.post("/register",register)

router.post("/barang",auth,uploadFile("photo"),addBarang)
router.get("/barangs",auth,getBarangs)
router.get("/barang/:id",auth,getBarang)
router.patch("/barang/:id",auth,uploadFile("photo"),updateBarang)
router.delete("/barang/:id",auth,deleteBarang)

module.exports=router;

