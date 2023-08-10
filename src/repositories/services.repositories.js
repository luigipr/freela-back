
import {db} from "../db/db.connection.js"

export async function allServices() {
    return await db.query(`SELECT * FROM services WHERE services.available = true LIMIT 30`)
} 

export async function servicesById(user) {
    return await db.query(`SELECT * FROM services WHERE services.available = true AND services."userId" = $1`, [user.id]) 
}

export async function servicesByLocation(location) {
    return await db.query(`SELECT * FROM services WHERE services.available = true AND services.location = $1`, [location])
}

export async function getUserId(token) {
    
    return await db.query(`SELECT * FROM sessions WHERE sessions.token = $1`, [token])
}

export async function insertService(name,description,image,price,location, userId) {
    return await db.query(`INSERT INTO services name,description,image,price,location VALUES
    ($1, $2, $3, $4, $5, $6)` [name, description, image, price, location, userId])
}