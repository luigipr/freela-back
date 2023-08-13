import { allServices, servicesByUserId, servicesByLocation, getSession, insertService, serviceInactive, servicebyId } from "../repositories/services.repositories.js"



export async function getServices(req, res) {
    const {token}= req.headers;

    try{
    //const session = getUserId(token)
    const services = await allServices()
    console.log(services.rows)
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
        const userServices = await servicesByUserId(session.userId);
        //const servicesById = await db.query(`SELECT * FROM services WHERE services.available = true AND services."userId" = $1`, [user.id])
        res.status(200).send(userServices.rows)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

export async function getServiceById(req, res) {
    const {token} = req.headers;
    const serviceId = req.params

    const service = await servicebyId(serviceId)

    return res.status(200).send.send(service.rows)
}

export async function getServicesByLocation(req, res) {


    try{
        const LocalizeServices = await servicesByLocation(location)
        //const servicesByLocation = await db.query(`SELECT * FROM services WHERE services.available = true AND services.location = $1`, [location])
        res.status(200).send(LocalizeServices)
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

