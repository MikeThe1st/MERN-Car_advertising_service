import Car from "../models/Car.js"

export const addCar = async (req, res) => {
    try {
        // Destructure data from the request body
        const { brand, model, productionYear, price, fuel, is_damaged, color, mileage, description, horsePower, addedBy, gearbox, location } = req.body;

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
                addedBy: addedBy,
                gearbox,
                location
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
        const cars = await Car.find({}).sort({ createdAt: -1 })

        return res.status(200).json(cars)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const getMainPageCars = async (req, res) => {
    try {
        const randomCars = await Car.aggregate([{ $sample: { size: 6 } }])

        return res.status(200).json(randomCars)
    } catch (error) {
        console.error('Fetching random cars failed:', error);
        return res.status(500).json({ error: 'Fetching random cars failed.' })
    }
};

export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        if (!car) {
            return res.status(404).json({ error: 'Car not found' })
        }
        return res.status(200).json(car)
        // return res.status(200).json(car)
    } catch (error) {
        console.error('Error fetching car:', error)
        return res.status(500).json({ error: 'Failed to fetch car.' })
    }
}

export const getCarsAddedby = async (req, res) => {
    try {
        const { addedBy } = req.query;
        const cars = await Car.find({ addedBy });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cars.' });
    }
}