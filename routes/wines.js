const express = require("express");
const router = express.Router();
const verify = require("../routes/verifyToken");
const { getWines, getWine, deleteWine, createWine, updateWine } = require("../controllers/winesController");

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
});
   
const upload = multer({ storage: storage });



router.get("/", getWines);

router.get("/:id", getWine);

router.delete("/:id", verify, deleteWine);

router.post("/", verify, upload.single('mainImage'), createWine);

router.put("/:id", verify, updateWine);

module.exports = router;