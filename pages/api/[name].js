import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const {
    query: { name },
  } = req;
  const { db } = await connectToDatabase();
  const re = new RegExp(name, "i"); // /^name-variable/i

  const restaurant = await db
    .collection("restaurants")
    .findOne({ name: { $regex: re } });

  res.json(restaurant);
}
