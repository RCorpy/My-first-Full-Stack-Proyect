const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Model = require('./models/model')

const app = express()

app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongodb+srv://RCorp:44442222@cluster0-b41r5.mongodb.net/test?retryWrites=true&w=majority
const uri = "mongodb+srv://RCorp:44442222@tester-lqwta.mongodb.net/todos?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })

mongoose.connection.on('connected', () =>{ console.log("connected!")})

app.get('/api', async (req, res) => {
    const data = await Model.find()
    res.json(data)
})

app.post('/api', async (req, res) => {
    let newEntry = await new Model(req.body)
    newEntry.save()
})

app.post('/api/:id', async (req, res) => {
    let deleteEntry = await Model.findOne({newID: req.params.id})
    deleteEntry.delete()
})

app.listen(8080, () => console.log("connected"))