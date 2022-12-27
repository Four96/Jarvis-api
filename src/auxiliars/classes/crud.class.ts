import { Model } from 'mongoose'


class CrudClass {
    
    public async Create(data: Object[], model: Model<any>): Promise<Object[]> {
        let ObjectsArray: Object[] = []
        for (let datum of data) {
            try {
                // TODO Utilizar insertMany() en vez de create(). https://mongoosejs.com/docs/api.html#model_Model.insertMany
                const doc = await model.create(datum)
                ObjectsArray.push({error: false, success_message: `${model.modelName.split('M')[0]} se creó satisfactoriamente.`})
            } catch (error: any) {
                ObjectsArray.push({error: true, error_message: error.message})
            }
        }
        return ObjectsArray
    }

    public async Read(data: Object[], model: Model<any>): Promise<Object[]> {
        let ObjectsArray: Object[] = []
        for (let datum of data) {
            try {
                const doc = await this.GetDoc(model, datum)
                ObjectsArray.push({error: false, existe: true, data: doc})
            } catch (error: any) {
                ObjectsArray.push({error: true, existe: false, error_message: error.message})
            }
        }
        return ObjectsArray
    }

    public async Update(data: any[], model: Model<any>): Promise<Object[]> {
        let ObjectsArray: Object[] = []
        for (const datum of data) {
            if (datum.new_data.Password) ObjectsArray.push({error: true, error_message: "En este endpoint no se cambia la contraseña."})
            try {
                // TODO Hacer de manera explícita que datum contiene las claves busqueda y new_data separándolos en variables.
                const doc = await this.GetDocToUpdate(model, datum)
                if (doc) {
                    ObjectsArray.push({error: false, existe: true, message: `${model.modelName.split('M')[0]} se actualizó satisfactoriamente.`})
                } else {
                    ObjectsArray.push({error: false, existe: false, message: `${model.modelName.split('M')[0]} no existe.`})
                }
            } catch (error: any) {
                ObjectsArray.push({error: true, error_message: error.message})
            }
        }
        return ObjectsArray
    }

    public async Delete(data: Object[], model: Model<any>): Promise<Object[]> {
        let ObjectsArray: Object[] = []
        for (let datum of data) {
            try {
                let pais = await model.findOne(datum)
                if (pais) {
                    pais.remove()
                    ObjectsArray.push({error: false, success_message: `${model.modelName.split('M')[0]} se eliminó satisfactoriamente.`})
                }
                else {
                    ObjectsArray.push({error: true, error_message: `${model.modelName.split('M')[0]} no existe.`})
                }
            } catch (error: any) {
                ObjectsArray.push({error: true, error_message: error.message})
            }
        }
        return ObjectsArray
    }

    private async GetDoc(model: Model<any>, datum: Object): Promise<any> {
        let doc: any 
        if (model.modelName === 'DepartamentoModel') {doc = await model.find(datum).populate('Pais')}
        else if (model.modelName === 'CiudadModel') {doc = await model.find(datum).populate({path: 'Departamento', populate: {path: 'Pais', model: 'PaisModel'}})}
        else if (model.modelName === 'UsuarioModel') {doc = await model.find(datum)}
        // TODO Para ProductoModel utilizar https://mongoosejs.com/docs/populate.html#query-conditions
        else if (model.modelName === 'ProductoModel') {doc = await model.find(datum).populate({path: 'Genero', match: {Estado: true}}).populate({path: 'Marca', match: {Estado: true}}).populate({path: 'Categoria', match: {Estado: true}}).populate({path: 'Subcategoria', match: {Estado: true}}).populate({path: 'Variantes.Color', match: {Estado: true}})}
        else if (model.modelName === 'GrupoTallasModel') {doc = await model.find(datum).populate('Tallas.Talla')}
        else if (model.modelName === 'CategoriaModel') {doc = await model.find(datum).populate('Subcategorias.Subcategoria').sort('Orden')}
        else if (model.modelName === 'MarcaModel') {doc = await model.find(datum).sort('Orden')}
        else if (model.modelName === 'TallaModel') {doc = await model.find(datum).sort('Orden')}
        else {doc = await model.find(datum)}
        return doc
    }

    private async GetDocToUpdate(model: Model<any>, datum: Object | any): Promise<any> {
        let doc: any 
        if (model.modelName === 'DepartamentoModel') {doc = await model.findOneAndUpdate(datum.busqueda, datum.new_data, {new: true}).populate('Pais')}
        else if (model.modelName === 'CiudadModel') {doc = await model.findOneAndUpdate(datum.busqueda, datum.new_data, {new: true}).populate('Departamento').populate('Pais')}
        else if (model.modelName === 'UsuarioModel') {doc = await model.findOneAndUpdate(datum.busqueda, datum.new_data, {new: true}).populate('Ciudad')}
        // TODO Para ProductoModel utilizar https://mongoosejs.com/docs/populate.html#query-conditions
        else if (model.modelName === 'ProductoModel') {doc = await model.findOneAndUpdate(datum.busqueda, datum.new_data, {new: true}).populate({path: 'Genero', match: {Estado: true}}).populate({path: 'Marca', match: {Estado: true}}).populate({path: 'Categoria', match: {Estado: true}}).populate({path: 'Subcategoria', match: {Estado: true}}).populate({path: 'Variantes.Color', match: {Estado: true}})}
        else if (model.modelName === 'CategoriaModel') {doc = await model.findOneAndUpdate(datum.busqueda, datum.new_data, {new: true}).populate('Tallas.Talla')}
        else if (model.modelName === 'GrupoTallasModel') {doc = await model.findOneAndUpdate(datum.busqueda, datum.new_data, {new: true}).populate('GrupoTallas')}
        else {doc = await model.findOneAndUpdate(datum.busqueda, datum.new_data, {new: true})}
        return doc
    }

}

const CrudObject = new CrudClass()
export default CrudObject
