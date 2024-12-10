import Car from "../models/Car.js"

export const addCar = async (req, res) => {
    try {
        // Destructure data from the request body
        const { brand, model, productionYear, price, fuel, is_damaged, color, mileage, description, horsePower, addedBy } = req.body;

        // Get car number
        const carCount = await Car.countDocuments();

        const imgFileName = `${carCount + 1}-car.jpg`;

        try {
            const newCar = new Car({
                number: carCount + 1,
                brand,
                model,
                productionYear,
                price,
                fuel,
                horsePower,
                is_damaged: is_damaged === 'true',
                color,
                mileage,
                description,
                imgPath: `/${imgFileName}`,
                addedBy: addedBy
            });

            const savedCar = await newCar.save();
            res.status(201).json(savedCar);
        } catch (error) {
            console.error('Error saving car to DB:', error);
            res.status(500).json({ error: 'Failed to add car to the database.' });
        }
        // });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({ error: 'Error adding car.' });
    }
}

export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({})

        return res.status(200).json(cars)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}