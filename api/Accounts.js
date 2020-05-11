const router = require('express').Router();
const db = require("../data/dbConfig.js");

router.get('/', (req, res) => {
    return db('accounts')
        .then(resp => {
            res.status(200).json(resp);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: `The server errored.` });
        })
})

router.get('/:id', (req, res) => {
    return db('accounts')
        .where({ id: req.params.id })
        .then(resp => {
            res.status(200).json(resp);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: `The server errored.` });
        })
})

router.post('/', (req, res) => {
    const { name, budget } = req.body
    if (!name || !budget) return res.status(500).json({ message: "Please provide a name and budget in the body of the request." });

    return db('accounts').insert({ name, budget })
        .then(resp => {
            return db('accounts').where({ id: parseInt(resp) }).then(resp => res.status(201).json({ data: resp[0] })).catch(error => res.status(500).json(error));
    })
    .catch(error => {
        console.log(error);
        return res.status(500).json({ message: `The server errored.` });
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;

    return db('accounts').where({ id }).update(req.body)
    .then(resp => {
        res.status(200).json(resp);
    })
    .catch(error => {
        console.log(error);
        return res.status(500).json({ message: `The server errored.` });
    })
})


router.delete('/:id', (req, res) => {
    return db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(resp => {
            res.status(200).json(resp);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: `The server errored.` });
        })
})

module.exports = router;