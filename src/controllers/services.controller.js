import { allServices, servicesByUserId, servicesByLocation, getSession, insertService, serviceInactive, servicebyId, userById } from "../repositories/services.repositories.js"



export async function getServices(req, res) {
    const {token}= req.headers;

    try{
    //const session = getUserId(token)
    const services = await allServices()
    
    //const allServices = await db.query(`SELECT * FROM services WHERE services.available = true LIMIT 30`)
    res.status(200).send(services.rows)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export async function getServicesByUserId(req, res) {
    const {token}= req.headers;
    try{
        const session = await getSession(token)
        console.log(session.rows)
        const userServices = await servicesByUserId(session.userId);
        //const servicesById = await db.query(`SELECT * FROM services WHERE services.available = true AND services."userId" = $1`, [user.id])
        res.status(200).send(userServices.rows)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export async function getUserById(req, res) {
    const userId = req.body;

    const user = await userById(userId)

    return res.status(200).send(user)
}

export async function getServiceById(req, res) {
    const {token} = req.headers;
    try{
        const serviceId = req.params
        console.log(serviceId);
        const {id } = serviceId
        console.log(id)
        const service = await servicebyId(id)

        console.log(service.rows)

        return res.status(200).send(service.rows[0])
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export async function getServicesByLocation(req, res) {


    try{
        const LocalizeServices = await servicesByLocation(location)
        //const servicesByLocation = await db.query(`SELECT * FROM services WHERE services.available = true AND services.location = $1`, [location])
        res.status(200).send(LocalizeServices.rows)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export async function postService(req, res) {

    const {token} = req.headers;


    const {name, description, image, price, uf, city, userId} = req.body;
    console.log(name, description, image, price, uf,city, userId)
    try {
        //const session = getSession(token)
        //const userId = session.userId

        await insertService(name, description, image, price, uf,city, userId)

        res.sendStatus(201)
    } catch (err) {
       console.log(err)
        res.status(500).send(err.message) 
    }
}

export async function deactivateService(req, res) {
    const {token} = req.headers;
    const {id} = req.parms
    try {
        await serviceInactive(id)
        res.sendStatus(204)
    }catch (error) {
       console.log(err)
        res.status(500).send(err.message) 
    }
}

