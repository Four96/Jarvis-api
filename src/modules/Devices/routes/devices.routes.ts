import {Router} from 'express'
import DevicesControllers from '../controllers/devices.controllers'


class DevicesRoutes {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes() {
        this.router.post('/CreateDevices', DevicesControllers.CreateDevices)
        this.router.get('/GetDevices', DevicesControllers.GetDevices)
        this.router.put('/UpdateDevices', DevicesControllers.UpdateDevices)
        this.router.post('/DeleteDevices', DevicesControllers.DeleteDevices)
    }
    
}


const devicesRoutes = new DevicesRoutes()
export default devicesRoutes.router