import {db} from "../db/db.connection.js"
import { allServices, servicesById, servicesByLocation, getSession, insertService } from "../repositories/services.repositories.js"



export async function getServices(req, res) {
    const token = req.params;
    try{
    //const session = getUserId(token)
    const services = allServices()
    //const allServices = await db.query(`SELECT * FROM services WHERE services.available = true LIMIT 30`)
    res.status(200).send(services)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export async function getServicesById(req, res) {
    const token = req.params;
    try{
        const session = getSession(token)
        const userServices = servicesById(session.userId);
        //const servicesById = await db.query(`SELECT * FROM services WHERE services.available = true AND services."userId" = $1`, [user.id])
        res.status(200).send(userServices)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export async function getServicesByLocation(req, res) {


    try{
        const LocalizeServices = servicesByLocation(location)
        //const servicesByLocation = await db.query(`SELECT * FROM services WHERE services.available = true AND services.location = $1`, [location])
        res.status(200).send(LocalizeServices)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export async function postService(req, res) {

    const token = req.params;
    const {name, description, image, price, location} = req.body;
    try {
        const session = getSession(token)
        const userId = session.userId

        insertService(name, description, image, price, location, userId)

        res.sendStatus(201)
    } catch (error) {
       console.log(err)
        res.status(500).send(err.message) 
    }
}
