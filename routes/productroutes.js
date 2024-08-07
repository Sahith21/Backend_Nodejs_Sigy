const express = require('express');
const productcontroller = require('../controllers/productcontroller');

const router = express.Router();

router.post('/add-product/:fId',productcontroller.addproduct);
router.get('/:fId/products',productcontroller.getproductbyfirm);
router.get('/uploads/:imagename',(req,res)=>{
    const imagename = req.params.imagename;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imagename));
});
router.delete('/:productId',productcontroller.deleteproductbyId);

module.exports = router;