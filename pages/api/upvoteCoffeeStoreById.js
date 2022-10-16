import table, { findRecordByFilter } from "../../lib/airtable.js";

export default async function upvoteCoffeeStoreById(req, res) {
	if (req.method === "PUT") {
		try {
			const { id } = req.body;

			if (id) {
				const records = await findRecordByFilter("id", id);

				if (records.length !== 0) {
					const record = records[0];
					const calculateRating = parseInt(record.rating) + 1;

					// Update Record
					const updateRecord = await table.update([
						{
							id: record.recordId,
							fields: {
								rating: calculateRating,
							},
						},
					]);
					if (updateRecord) {
						res.json([
							{
								recordId: updateRecord[0].id,
								...updateRecord[0].fields,
							},
						]);
					}
				} else {
					res.json({ msg: "Coffee store id doesn't exist", id });
				}
			}
		} catch (error) {
			res.status(500).json({ message: "Error upvoting coffee store", error });
		}
	}
}
