import {db} from "../db/db.connection.js"


export async function login(user, token) {
    return await db.query(`INSERT INTO sessions (token, "userId", "userName") VALUES ($1, $2, $3)`, [token, user.rows[0].id, user.rows[0].name])
}

export async function findUserByEmail(email) {
    return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  }

export async function postUser(name, lastName, email, phone, hash) {
    return await db.query(`INSERT INTO users (name, "lastName", email, phone, password) VALUES ($1, $2, $3, $4, $5)`, [name, lastName, email, phone, hash])
}

export async function deleteSessions(user) {
    return await db.query(`DELETE FROM sessions WHERE sessions."userId" = $1`, [user.rows[0].id])
}

