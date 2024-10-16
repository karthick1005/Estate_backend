const { sequelize, estates, estate_image, utilities_master, amenities_master, user_estates, users, pricingtable, quotations, amenities } = require("../../../models");
const getalluserestate = async (req, res) => {
    try {
        const { user_id } = req.query;

        if (user_id === null || user_id === undefined || user_id === "") {
            return res.status(500).json({ message: "Invalid parameter or paramater Missing" })
        }
        console.log(user_id)
        const data = await users.findAll({
            where: {
                id: user_id
            },
            include: {
                model: user_estates,
                as: "user_estates",
                include: {
                    model: estates,
                    as: "estate", include: [
                        {
                            model: estate_image,
                            as: "estate_images",
                        },
                        {
                            model: utilities_master,
                            as: "utilities_masters"
                        }, {
                            model: amenities_master,
                            as: "amenities_masters"
                        }
                        // as: "id"
                    ],
                }
            }
        })
        console.log(data)
        return res.send(data[0])
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error: error })
    }
}
const listofobject = [
    "Amenities",
    "Utility",
    "primary",
    "secondary",
    "onetime",
    "inventory",
    "parking",
];
const Extra = [
    "Amenities",
    "Utility"
]
const createquotation = async (req, res) => {
    try {
        console.log(req.body)
        const { user_id, estate } = req.body;


        const data = await Promise.all(
            estate.map(async (estatedata) => {
                const { primary } = estatedata;

                if (primary == null) {
                    throw new Error("Missing parameter");
                }

                const quot = await quotations.create({ user_id, estate_id: estatedata.id });
                console.log(quot)
                const pricingPromises = listofobject.map(async (object) => {
                    const pricingdata = estatedata[object];
                    if (pricingdata !== undefined)
                        return pricingtable.create({
                            pricingtype: object,
                            allpriceobject: pricingdata.price,
                            discount_amount: pricingdata.Discount,
                            quotation_id: quot.id,
                        });
                });

                await Promise.all(pricingPromises);
                const amenites = estatedata["Amenities"];
                if (amenites !== null && amenites !== undefined && amenites?.length >= 1) {
                    let pushamenities = amenites.map((amenitesdata) => {
                        if (amenitesdata.id == null || amenitesdata.id === undefined || amenitesdata.free == null || amenitesdata.free == undefined || amenitesdata.Discount == null || amenitesdata.Discount == undefined) {
                            throw new Error("Missing parameter");
                        }
                        return amenities.create({
                            amenities_id: amenitesdata.id,
                            free: amenitesdata.free,
                            quotation_id: quot.id,
                            discount_amount: amenitesdata.Discount
                        })
                    })
                    await Promise.all(pushamenities)
                }
                const utility = estatedata["Utility"];
                if (utility !== null && utility !== undefined && utility?.length >= 1) {
                    let pushutility = utility.map((utilitydata) => {
                        if (utilitydata.id == null || utilitydata.id === undefined || utilitydata.Discount == null || utilitydata.Discount == undefined) {
                            throw new Error("Missing parameter");
                        }
                        return amenities.create({
                            amenities_id: utilitydata.id,
                            quotation_id: quot.id,
                            discount_amount: utilitydata.Discount
                        })
                    })
                    await Promise.all(pushutility)
                }
                return quot;
            })

        );
        console.log(data)
        res.status(200).json({ message: "All quotations and pricing data created successfully", data });

    } catch (error) {
        console.log("this is error", error);
        res.status(500).json({ message: "Internal Server error", error: error })
    }
}
module.exports = { getalluserestate, createquotation }