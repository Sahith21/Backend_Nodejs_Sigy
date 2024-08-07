const express = require ('express');
const firmcontroller = require('../controllers/firmcontroller');
const verifytoken = require('../middlewares/verifytoken');

const router = express.Router()

router.post('/add-firm',verifytoken,firmcontroller.addfirm);
router.get('/uploads/:imagename',(req,res)=>{
    const imagename = req.params.imagename;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imagename));
});
router.delete('/:fId',firmcontroller.deletefirmbyId);
module.exports = router;