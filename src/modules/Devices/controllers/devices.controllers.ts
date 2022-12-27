import { Request, Response } from 'express'
import DevicesModel from '../models/devices.models'
import CrudObject from '../../../auxiliars/classes/crud.class'


class DevicesControllers {

    public async CreateDevices(req: Request, res: Response): Promise<void> {
        let ObjectsArray: Object[] = await CrudObject.Create(req.body.data, DevicesModel)
        res.status(200).json(ObjectsArray)
    }

    public async GetDevices(req: Request, res: Response): Promise<void> {
        let ObjectsArray: Object[] = await CrudObject.Read([{}], DevicesModel)
        res.status(200).json(ObjectsArray)
    }

    public async UpdateDevices(req: Request, res: Response): Promise<void> {
        let ObjectsArray: Object[] = await CrudObject.Update(req.body.data, DevicesModel)
        res.status(200).json(ObjectsArray)
    }

    public async DeleteDevices(req: Request, res: Response): Promise<void> {
        let ObjectsArray: Object[] = await CrudObject.Delete(req.body.data, DevicesModel)
        res.status(200).json(ObjectsArray)
    }

}

const devicesControllers = new DevicesControllers();
export default devicesControllers;