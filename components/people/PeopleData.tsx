import { PeopleExplorer } from "@/components/people/PeopleExplorer";
import { fetchAllPeopleCached } from "@/lib/swapi";

export default async function PeopleData() {
  const people = await fetchAllPeopleCached();

  return <PeopleExplorer people={people} />;
}
