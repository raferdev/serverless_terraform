const create = async (event) => {

    return  {

        statusCode: 200,
        body: JSON.stringify({
            message: 'Booking created successfully!',
            body: event.body,
        }),
    };
}

export { create }