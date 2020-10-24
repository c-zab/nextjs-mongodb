import { connectToDatabase } from "../util/mongodb";

export default function Movies({ restaurants }) {
  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li>
            <p>{restaurant.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const restaurants = await db
    .collection("restaurants")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return {
    props: {
      restaurants: JSON.parse(JSON.stringify(restaurants)),
    },
  };
}