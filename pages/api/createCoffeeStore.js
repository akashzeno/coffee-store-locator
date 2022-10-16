import table from "../../lib/airtable.js";

export default async function createCoffeeStore(req, res) {
	if (req.method === "POST") {
		const { id, name, address, neighborhood, rating, img_url } = req.body;

		try {
			if (id) {
				const findCoffeeStoreRecords = await table
					.select({
						filterByFormula: `id="${id}"`,
					})
					.firstPage();

				if (findCoffeeStoreRecords.length !== 0) {
					const record = [findCoffeeStoreRecords[0]["fields"]];
					res.json(record);
				} else {
					// Create A Record
					if (name) {
						const createRecords = await table.create([
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
						res.json([createRecords[0]["fields"]]);
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
