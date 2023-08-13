
import {db} from "../db/db.connection.js"

export async function allServices() {
    return await db.query(`SELECT * FROM services WHERE services.available = true LIMIT 30`)
} 

export async function servicebyId(id) {
    return await db.query(`SELECT * FROM services WHERE services.id = $1`, [id])
    
}

export async function servicesByUserId(user) {
    return await db.query(`SELECT * FROM services WHERE services.available = true AND services."userId" = $1`, [user.id]) 
}

export async function servicesByLocation(location) {
    return await db.query(`SELECT * FROM services WHERE services.available = true AND services.location = $1`, [location])
}

export async function getSession(token) {
    
    return await db.query(`SELECT * FROM sessions WHERE sessions.token = $1`, [token])
}

export async function insertService(name,description,image,price,uf, city, userId) {
    console.log(name,description,image,price,uf, city, userId)
    return await db.query(`INSERT INTO services (name,description,image,price,uf, city, "userId") VALUES
    ($1, $2, $3, $4, $5, $6, $7)`, [name, description, image, price, uf,city,userId])
}

export async function serviceInactive(id) {
    return await db.query(`UPDATE services SET available = false WHERE services.id = $1`, [id])
}