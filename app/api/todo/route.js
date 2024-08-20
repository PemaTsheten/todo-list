import knex from "@/knexconnection";

export async function POST(req) {
    const {description, createdAt, isCompleted } = await req.json();

    const data = await knex('todo_list')
    .insert({
        description,
        created_at:createdAt,
        is_completed:isCompleted
    }).returning('*')
    return Response.json(data)
}

export async function GET(req) {
    const data = await knex('todo_list')
    // .orderBy('is_completed')
    .select('*')
    return Response.json(data)
}

