import knex from "@/knexconnection";

export async function PUT(req, {params}) {
    const body = await req.json()

    const {description, createdAt, isCompleted} = body;
    const data = await knex('todo_list')
    .where('id', params.id)
    .update({
        description,
        created_at:createdAt,
        is_completed:isCompleted
    })
    return Response.json(data)
}

export async function DELETE(req) {
    const {id} = await req.json();
    try{
        const data = await knex('todo_list')
        .where({id})
        .del()
        .returning('*');

        return Response.json({sucess: true,data});
    } catch(error) {
        return Response.json({sucess: false, error: 'Error deleting task'});
    }
}