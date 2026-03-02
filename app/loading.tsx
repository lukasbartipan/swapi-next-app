import { PeopleSkeleton } from "@/components/people/PeopleSkeleton";

export default function Loading() {
  return (
    <div className="pb-16 animate-pulse">
      <PeopleSkeleton />
    </div>
  );
}
