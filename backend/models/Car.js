import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
    {
        number: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        productionYear: { type: Number, required: true },
        price: { type: Number, required: true },
        fuel: {
            type: String,
            required: true,
            enum: ["Benzyna", "Diesel", "Elektryczny", "Hybryda"]
        },
        horsePower: { type: Number, required: true },
        is_damaged: { type: Boolean, required: true, default: false },
        color: {
            type: String,
            required: true,
            enum: ["Czarny", "Biały", "Niebieski", "Zielony", "Żółty", "Czerwony"]
        },
        mileage: { type: Number, required: true },
        description: { type: String },
        imgPath: { type: String },
        addedBy: { type: String, required: true },
        gearbox: {
            type: String,
            required: true,
            enum: ["Manualna", "Automatyczna"]
        },
        location: { type: String, required: true },
        views: { type: Number, default: 0 },
        is_active: { type: Boolean, default: true},
        is_deleted: {type: Boolean, default: false}
    },
    { timestamps: true }
);

const Car = mongoose.model("Car", CarSchema);
export default Car;
