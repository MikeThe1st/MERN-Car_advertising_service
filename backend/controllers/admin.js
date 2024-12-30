import User from "../models/User.js"

export const changeUserStatus = async (req, res) => {
    try {
        const { userId, isActive } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isActive },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle user status' });
    }
}

export const changeUserAdmin = async (req, res) => {
    try {
        const { userId, isAdmin } = req.body;
        // If admin is disabled then set user type to "Użytkownik" as he is no longer admin andnever been seller
        const updatedSellerType = isAdmin ? "Admin" : "Użytkownik";
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                isAdmin,
                sellerType: updatedSellerType
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle admin role' });
    }
}