const factors = require("../model/factorsModel")

const createFactors = async(req, res) => {
    try {
        const factor = new factors(req.body);
        const result = await factor.save();

        return res.status(201).send({
            status: true,
            message: "factors saved",
            response: result
          });

    } catch (error) {
        return res.status(500).send({ message: error.message, success: 0 });
    }
}

module.exports={
    createFactors
}