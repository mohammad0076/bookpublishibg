const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongooseSchema = require('../Mongoose/Mongoose');
const Booklist = new mongoose.model('booklist', mongooseSchema);



//get all books   //http://localhost:5000/booklist
router.get('/', async (req, res) => {
    const booklist = await Booklist.find();
    try {

        res.send(booklist);


    }
    catch (error) {
        res.status(500).json({
            error: 'there is server site error'
        })
    }
})




//find the book by searching publisher age & book genre thype 

//http://localhost:5000/booklist/232/drama

router.get('/:publisher_age/:type', async (req, res) => {
    const booklist = await Booklist.find({ publisher_age: req.params.publisher_age, type: req.params.type });
    try {
        res.send(booklist);
    } catch (error) {
        res.status(500).json({
            error: 'there is server site error'
        });
    }
});

//get a single book using id
//http://localhost:5000/booklist/644ca7a91d558f4990870436
router.get('/:id', async (req, res) => {
    const booklist = await Booklist.findOne({ _id: req.params.id });
    res.send(booklist);


})


//post single book

//http://localhost:5000/booklist/
router.post('/', async (req, res) => {

    const booklist = new Booklist(req.body);
    //they have save name building method
    try {
        await booklist.save()
        res.status(200).json({
            message: 'successfully data enrolled'
        })
    }
    catch (error) {
        res.status(500).json({
            error: 'there is server site error'
        })
    }
})


//edit single book
//http://localhost:5000/booklist/644ca7a91d558f4990870436
router.put('/:id', async (req, res) => {
    try {
        const booklist = await Booklist.findById(req.params.id);

        if (!booklist) {
            return res.status(404).send('Booklist not found');
        }

        booklist.name = req.body.name;
        booklist.publisher_name = req.body.publisher_name;
        booklist.publisher_age = req.body.publisher_age;
        booklist.page_num = req.body.page_num;
        booklist.Publish_date = req.body.Publish_date;
        booklist.type = req.body.type;

        await booklist.save();
        res.send(booklist);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//delete book
//http://localhost:5000/booklist/644ca7a91d558f4990870436
router.delete('/:id', async (req, res) => {
    const booklist = await Booklist.deleteOne({ _id: req.params.id });
    res.send(booklist);
})


module.exports = router;