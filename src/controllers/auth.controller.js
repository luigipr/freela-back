import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

import { login, deleteSessions, findUserByEmail, postUser } from "../repositories/auth.repositories.js"

export async function signin(req , res) {
    //sign-in
        const {email, password} = req.body
       console.log(email)
       console.log(password)

        try {
            const user = await findUserByEmail(email)
            if (user.rowCount === 0) return res.status(401).send("Usuário não cadastrado")
            const correctPW = bcrypt.compareSync(password, user.rows[0].password)
            if (!correctPW) return res.status(401).send("Senha incorreta")
            console.log(correctPW)
            console.log(user)
            await deleteSessions(user)
            //db.collection("sessions").deleteMany({ userID: user._id })    
            const frontUser = user.rows[0];
            const token = uuid()
            
            const answer = await login(user, token)
            //db.query(`INSERT INTO sessions (token, "userId", "userName") VALUES ($1, $2, $3)`, [token, user.rows[0].id, user.rows[0].name])
            //db.collection("sessions").insertOne({ token, userID: user._id })
            console.log(answer)
            res.status(200).send({token, user})
        } catch (err) {
        res.status(500).send(err.message)
        }
};

export async function signup(req, res) {

    const {name, lastName, email,phone, password, confirmPassword} = req.body
    console.log(name, lastName, email, phone, password, confirmPassword)

    if (password !== confirmPassword) return res.status(422).send('as senhas devem ser iguais!')   

    try {
        const user = await findUserByEmail(email)
        console.log(user.rows)
		//const user = await db.collection("usuarios").findOne({ email })
		if (user.rowCount !== 0) return res.status(409).send("Esse usuario já existe!")

        const hash = bcrypt.hashSync(password, 10)


        await postUser(name, lastName, email, phone, hash)
		//const poser = await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, hash])
        //db.collection("usuarios").insertOne({ name, email, password: hash})
        //console.log(name, email)
		res.sendStatus(201)
	} catch (err) {
		res.status(500).send(err.message)
	}
};