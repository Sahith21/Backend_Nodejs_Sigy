const express = require ('express');
const firmcontroller = require('../controllers/firmcontroller');
const verifytoken = require('../middlewares/verifytoken');

const router = express.Router()

router.post('/add-firm',verifytoken,firmcontroller.addfirm);
router.get('/uploads/:imagename',(req,res)=>{
    const imagename = req.params.imagename;
    res.header('Content-Type','image/jpeg');
    res.sendFile(Path.join(__dirname,'..','uploads',imagename));
});
router.delete('/:fId',firmcontroller.deletefirmbyId);
module.exports = router;