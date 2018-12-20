'use strict'
const Tarea = use('App/Models/Tarea')

class TareaController {
    async showAll ({request,response}){
        const tareas = await Tarea.all()
        response = {
            data: tareas,
            status: 'OK'
        }
        return response
    }

    async store ({request,response}){
        const tarea = new Tarea()
        if(request.body.title === undefined || request.body.status === undefined){
            response = {
                data: 'Faltan parámetros',
                status: 'ERROR'
            }
    
            return response
        }

        if(request.body.title.length < 3 || request.body.title.length > 100){
            response = {
                data: 'El título debe contener entre 3 y 100 caracteres',
                status: 'ERROR'
            }
    
            return response
        }
        tarea.title = request.body.title
        tarea.status = request.body.status

        await tarea.save()

        response = {
            data: tarea.toJSON(),
            status: 'OK'
        }

        return response
    }

    async destroy({request,response}){
        const tarea = await Tarea.find(request.params.id)

        await tarea.delete()

        response = {
            data: null,
            status: 'OK'
        }

        return response
    }

    async update({request,response}){
        var title = request._qs.title
        var status = request._qs.status
        
        if(title === undefined || status === undefined){
            response = {
                data: 'Faltan parámetros',
                status: 'ERROR'
            }
    
            return response
        }

        if(title.length < 3 || title.length > 100){
            response = {
                data: 'El título debe contener entre 3 y 100 caracteres',
                status: 'ERROR'
            }
    
            return response
        }

        const tarea = await Tarea.find(request.params.id)

        tarea.title = title
        tarea.status = status

        await tarea.save()

        response = {
            data: tarea,
            status: 'OK'
        }

        return response
    }
}

module.exports = TareaController
