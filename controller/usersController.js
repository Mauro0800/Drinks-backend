const profile = async (req,res) => {
    return res.status(200).json({
        ok : true,
        user : req.user
    })
}

module.exports = {
    profile
}