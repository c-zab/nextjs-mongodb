import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const restaurants = await db
    .collection("restaurants")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(restaurants);
};