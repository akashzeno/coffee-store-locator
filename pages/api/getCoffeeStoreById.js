import { findRecordByFilter } from "../../lib/airtable.js";

export default async function getCoffeeStoreById(req, res) {
	const { id } = req.query;

	try {
		if (id) {
			const record = await findRecordByFilter("id", id);
			if (record.length !== 0) {
				res.json(record);
			} else {
				res.json({ message: "id could not be found in the record" });
			}
		} else {
			res.status(400).json({ message: "Id is missing" });
		}
	} catch (error) {
		res.status(500).json({ message: "Some went wrong", error });
	}
}
