const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee_stores");
export default table;

export async function findRecordByFilter(filterName, value) {
	const findCoffeeStoreRecords = await table
		.select({
			filterByFormula: `${filterName}="${value}"`,
		})
		.firstPage();
	if (findCoffeeStoreRecords.length !== 0) {
		return [
			{
				recordId: findCoffeeStoreRecords[0].id,
				...findCoffeeStoreRecords[0].fields,
			},
		];
	}
	return [];
}
