import table, { findRecordByFilter } from "../../lib/airtable.js";

export default async function createCoffeeStore(req, res) {
	if (req.method === "POST") {
		const { id, name, address, neighborhood, rating, img_url } = req.body;

		try {
			if (id) {
				const record = await findRecordByFilter("id", id);
				if (record.length !== 0) {
					res.json(record);
				} else {
					// Create A Record
					if (name) {
						const createRecord = await table.create([
							{
								fields: {
									id,
									name,
									address,
									neighborhood: `${neighborhood}`,
									rating,
									img_url,
								},
							},
						]);
						res.json([createRecord[0]["fields"]]);
					} else {
						res.status(400).json({ message: "name is missing" });
					}
				}
			} else {
				res.status(400).json({ message: "id is missing" });
			}
		} catch (error) {
			console.error("Error creating or finding a store", error);
			res
				.status(500)
				.json({ message: "Error Creating or Finding A Store", error });
		}
	}
}
