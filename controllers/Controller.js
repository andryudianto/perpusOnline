const {Renter, Book, BookRenter} = require('../models')
const bcryptjs = require('bcryptjs')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const emailGenerator = require('../helpers/send-email')

class Controller{

    static getHomeHandler(req, res){
        res.render('home')
    }

    static getRegisterHandler(req, res){
        res.render('register')
    }

    static postRegisterHandler(req, res){
        let newRenter = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address
        }

        Renter.create(newRenter)
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => {
            res.send(err)
        })
        
    }

    static getProfileHandler(req, res){
        let id = req.session.renterId
        
        Renter.findByPk(id)
        .then(data => {
            res.render('profile', {data})
        })
    }

    static postProfileHandler(req, res){
        let id = req.params.id
        let updateProfle = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            email: req.body.email,
            address: req.body.address
        }

        Renter.update(updateProfle, {
            where: {
                id: id
            }
        })
        .then(data => {
            res.redirect('/books')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteMyAccount(req, res){
        let id = req.params.id
        Renter.destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            res.render('say-good-bye')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showBookHandler(req, res){
        Book.findAll()
        .then(data => {
            res.render('books', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }   

    static getLoginHandler(req, res){
        res.render('login')
    }

    static postLoginHandler(req, res){
        let email = req.body.email
        let password = req.body.password

        Renter.findOne({
            where: {
                email: email
            }
        })
        .then(renter => {
            if (!renter){
                throw 'email / password salah'
            }
            let hashPassword = renter.password
            if (bcryptjs.compareSync(password, hashPassword)){
                req.session.renterId = renter.id
                res.redirect('/books')
            }
            else{
                res.send('password / email salah')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logoutHandler(req, res){
        req.session.destroy(err => {
            if (err){
                res.send(err)
            }
            else{
                res.redirect('/')
            }
        })
    }

    static getChangePasswordHandler(req, res){
        let id = Number(req.params.id)
        Renter.findByPk(id)
        .then(data => {
            res.render('change-password', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postChangePasswordHandler(req, res){
        let newPassword = req.body.password
        let id = req.params.id

        Renter.update(newPassword,{
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect('/books')
        })

        .catch(err => {
            res.send(err)
        })
    }

    static getBookByIdHandler(req, res){
        let id = Number(req.params.id)
        
        Book.findByPk(id)
        .then(data => {
            res.render('detail-book', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getSortBookHandler(req, res){
        let search = req.query.search

        Book.findAll({ where: { title: { [Op.like]: `%${search}%` } } })
        .then(data => {
            res.render('books', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getOrderBookHandler(req, res){
        let newOrder = {
            BookId: req.params.id,
            RenterId: req.session.renterId
        }

        BookRenter.create(newOrder)
        .then(data => {
            return Renter.findByPk(data.RenterId)
        })
        .then(data => {
            emailGenerator(data)
            res.redirect('/myorder')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAllMyOrderBookHandler(req, res){
        let id = req.session.renterId
        
        Renter.findByPk(id, {
            include: Book
        })
        .then(data => {
            res.render('myorder', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

}

module.exports = Controller