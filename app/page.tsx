import { Suspense } from "react";

import PeopleData from "@/components/people/PeopleData";
import { PeopleSkeleton } from "@/components/people/PeopleSkeleton";

export default function Home() {
  return (
    <div className="pb-16">
      <Suspense fallback={<PeopleSkeleton />}>
        <PeopleData />
      </Suspense>
    </div>
  );
}
