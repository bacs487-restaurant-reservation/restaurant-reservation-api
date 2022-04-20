// Configure PostgreSQL connection
const fs = require('fs');
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'doadmin',
    host: 'db-postgresql-sfo3-26806-do-user-10683631-0.b.db.ondigitalocean.com',
    database: 'restaurantapp',
    password: 'kvPZn8mk5REQqpAJ',
    port: 25060,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('ca-certificate.crt') // file location needs to be placed here.
    }
})

// Restaurant Methods
// Create a restaurant
const addRestaurant = async (request, response) => {
    const id = parseInt(request.params.id)
    const zip_code = parseInt(request.params.zip_code)
    const restaurant_name = request.params.restaurant_name
    
    pool.query('INSERT INTO restaurants (id, restaurant_name, zip_code) VALUES ($1, $2, $3)',
    [id, restaurant_name, zip_code], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Restaurant added with ID: ${id}`)
    })
};
// Modify a restaurant
const updateRestaurant = (request, response) => {
    const id = parseInt(request.params.id)
    const zip_code = parseInt(request.params.zip_code)
    const restaurant_name = request.params.restaurant_name

    pool.query ('UPDATE restaurants SET restaurant_name = $1, zip_code = $2 WHERE id = $3',
        [restaurant_name, zip_code, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Restaurant modified with ID: ${id}`)
        })
};
// Retrieve an individual restaurant by id
const getRestaurant = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM restaurants WHERE id = $1', [id],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
// Retrieve all restaurants
const getAllRestaurants = async (request, response) => {
    pool.query('SELECT * FROM restaurants ORDER BY id ASC', (error, results) => {
         if (error) {
             console.log("Request made to getAllRestaurant - Failed");
             throw error
         }
        console.log("Request made to getAllRestaurant - Status Code: 202 (Success)");
        response.status(200).json(results.rows);
     })
};
// Replace a restaurant
const replaceRestaurant = (request, response) => {
    const id = parseInt(request.params.id)
    const zip_code = parseInt(request.params.zip_code)
    const restaurant_name = request.params.restaurant_name

    pool.query ('UPDATE restaurants SET restaurant_name = $1, zip_code = $2, id = $3, WHERE id = $3',
        [restaurant_name, zip_code, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Restaurant modified with ID: ${id}`)
        })
};
// Remove a restaurant
const deleteRestaurant = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM restaurants WHERE id = $1', [id],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Restaurant deleted with ID: ${id}`)
    })
};

// Reservation Methods
// Create a reservation
const addReservation = async (request, response) => {
    const table_id = parseInt(request.params.table_id)
    const confirmation_number = parseInt(request.params.confirmation_number)
    const reservation_time = request.params.reservation_time
    
    pool.query('INSERT INTO reservations (table_id, reservation_time, confirmation_number) VALUES ($1, $2, $3)',
    [table_id, reservation_time, confirmation_number], 
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Reservation added with Confirmation Number: ${confirmation_number}`)
    })
};
// Update a reservation
const updateReservation = (request, response) => {
    const confirmation_number = parseInt(request.params.confirmation_number)
    const table_id = parseInt(request.params.table_id)
    const reservation_time = request.params.reservation_time

    pool.query ('UPDATE reservations SET table_id = $1, reservation_time = $2 WHERE confirmation_number = $3',
        [table_id, reservation_time, confirmation_number],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Reservation modified with Confirmation Number: ${confirmation_number}`)
        })
};
// Retrieve an individual reservation by confirmation_number
const getReservation = (request, response) => {
    const confirmation_number = parseInt(request.params.confirmation_number)
    
    pool.query('SELECT * FROM reservations WHERE confirmation_number = $1', [confirmation_number],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
// Retrieve all reservations
const getAllReservations = async (request, response) => {
    pool.query('SELECT * FROM reservations ORDER BY confirmation_number ASC',
     (error, results) => {
         if (error) {
             console.log("Request made to getAllReservations - Failed");
             throw error
         }
         console.log("Request made to getAllReservations - Status Code: 202 (Success)");
         response.status(200).json(results.rows)
     })
};
// Replace a reservation
const replaceReservation = (request, response) => {
    const confirmation_number = parseInt(request.params.confirmation_number)
    const table_id = parseInt(request.params.table_id)
    const reservation_time = request.params.reservation_time

    pool.query ('UPDATE reservations SET table_id = $1, reservation_time = $2, confirmation_number = $3 WHERE confirmation_number = $3',
        [table_id, reservation_time, confirmation_number],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Reservation modified with Confirmation Number: ${confirmation_number}`)
        })
};
// Remove a reservation
const deleteReservation = (request, response) => {
    const confirmation_number = parseInt(request.params.confirmation_number)

    pool.query('DELETE FROM reservations WHERE confirmation_number = $1', [confirmation_number],
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Reservation deleted with Confirmation Number: ${confirmation_number}`)
    })
};

// Exports the Methods
module.exports = {
    addRestaurant,
    updateRestaurant,
    getRestaurant,
    getAllRestaurants,
    replaceRestaurant,
    deleteRestaurant,
    addReservation,
    updateReservation,
    getReservation,
    getAllReservations,
    replaceReservation,
    deleteReservation
};