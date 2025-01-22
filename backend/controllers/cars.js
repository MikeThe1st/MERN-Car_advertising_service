import Brand from "../models/Brand.js";
import Car from "../models/Car.js"
import User from "../models/User.js";

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
        const cars = await Car.find({ is_active: true }).sort({ createdAt: -1 })
        return res.status(200).json(cars)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const getMainPageCars = async (req, res) => {
    try {
        const randomCars = await Car.aggregate([
            { $match: { is_active: true } },
            { $sample: { size: 6 } }
        ])

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
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        )
        const seller = await User.find({ email: car.addedBy }).select('-password')
        return res.status(200).json({ updatedCar, seller })
    } catch (error) {
        console.error('Error fetching car:', error)
        return res.status(500).json({ error: 'Failed to fetch car.' })
    }
}

export const getCarsAddedby = async (req, res) => {
    try {
        const { addedBy } = req.query;
        const cars = await Car.find({ addedBy, is_deleted: false });
        return res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cars.' });
    }
}

export const changeCarStatus = async (req, res) => {
    try {
        const { carId, newStatus } = req.body;
        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            { is_active: newStatus },
            { new: true }
        );

        if (!updatedCar) {
            return res.status(404).send('Car not found.');
        }

        res.status(200).send('Car status updated successfully');
    } catch (err) {
        console.error('Error updating car status:', err);
        res.status(500).json({ error: 'Failed to update car status.' });
    }
};

export const getAdminCars = async (req, res) => {
    try {
        const cars = await Car.find({is_deleted: false}).sort({ createdAt: -1 })
        return res.status(200).json(cars)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const searchCars = async (req, res) => {
    try {
        const filters = req.body;
        filters.is_active = true;
        if (filters.fuelType) {
            filters.fuel = filters.fuelType;
            delete filters.fuelType;
        }

        // Build the query object dynamically
        const query = {};
        for (const [key, value] of Object.entries(filters)) {
            if (value !== '') {
                if (key === 'minPrice') query.price = { ...query.price, $gte: value };
                else if (key === 'maxPrice') query.price = { ...query.price, $lte: value };
                else if (key === 'minYear') query.year = { ...query.year, $gte: value };
                else if (key === 'maxYear') query.year = { ...query.year, $lte: value };
                else if (key === 'minMileage') query.mileage = { ...query.mileage, $gte: value };
                else if (key === 'maxMileage') query.mileage = { ...query.mileage, $lte: value };
                else if (key === 'minHorsePower') query.horsePower = { ...query.horsePower, $gte: value };
                else if (key === 'maxHorsePower') query.horsePower = { ...query.horsePower, $lte: value };
                else if (key === 'is_damaged') query.is_damaged = value === 'true' ? true : false;
                else query[key] = value;
            }
        }

        // Perform the search with the dynamically built query
        const cars = await Car.find(query);

        return res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch cars." });
    }
};

export const flagAsDeleted = async (req, res) => {
    try {
        const { carId } = req.body;
        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            { is_active: false, is_deleted: true },
            { new: true }
        );

        if (!updatedCar) {
            return res.status(404).send('Car not found.');
        }

        res.status(200).send('Car marked as deleted successfully');
    } catch (err) {
        console.error('Error updating car status:', err);
        res.status(500).json({ error: 'Failed to update car status.' });
    }
};

export const getBrandsAndModels = async (req, res) => {
    try {
        const brandsWithModels = await Brand.find({})
        return res.status(200).json(brandsWithModels)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const getBrands = async (req, res) => {
    try {
      const brands = await Brand.find().select('brand -_id');
      res.json(brands.map((car) => car.brand));
    } catch (error) {
      res.status(500).json({ error: 'Error fetching brands.', details: error });
    }
}

export const addBrand = async (req, res) => {
    const { brand } = req.body;
    try {
      const newBrand = new Brand({ brand });
      await newBrand.save();
      res.status(201).json({ msg: `Brand: ${brand} added successfully.` });
    } catch (error) {
      res.status(500).json({ error: 'Error adding brand.', details: error });
    }
}

export const addModel = async (req, res) => {
    const { brand, model } = req.body;
    try {
      const car = await Brand.findOne({ brand });
      if (!car) {
        return res.status(404).json({ error: 'Brand not found.' });
      }
      if (!car.models.includes(model)) {
        car.models.push(model);
        await car.save();
      }
      res.status(201).json({ msg: `Model: ${model} added successfully to brand: ${brand}.` });
    } catch (error) {
      res.status(500).json({ error: 'Error adding model.', details: error });
    }
  }
