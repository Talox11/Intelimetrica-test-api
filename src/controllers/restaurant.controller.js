import { Restaurant } from "../models/restaurant.js";

export const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createRestaurants = async (req, res) => {
    try {
        const { rating, name, site, email, phone, street, city, state, lat, lng } = req.body;
        const newRestaurant = await Restaurant.create({ rating, name, site, email, phone, street, city, state, lat, lng })
        res.send('restaurant created successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, name, site, email, phone, street, city, state, lat, lng } = req.body;

        const restaurant = await Restaurant.findByPk(id);
        restaurant.rating = rating,
            restaurant.name = name,
            restaurant.site = site,
            restaurant.email = email,
            restaurant.phone = phone,
            restaurant.street = street,
            restaurant.city = city,
            restaurant.state = state,
            restaurant.lat = lat,
            restaurant.lng = lng,
            await restaurant.save();

        res.json(restaurant);
    } catch (error) {

    }
}
export const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        await Restaurant.destroy({
            where: {
                id,
            },
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findOne({ where: { id } });
        if(!restaurant)
            return res.status(404).json({ "message": "No restaurant found" });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

}









