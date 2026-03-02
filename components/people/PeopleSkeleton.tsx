const skeletonItems = Array.from({ length: 15 }, (_, index) => index);

type PeopleSkeletonProps = {
  withHeader?: boolean;
  withFilters?: boolean;
  withMeta?: boolean;
  withPagination?: boolean;
};

export const PeopleSkeleton = ({
  withHeader = true,
  withFilters = true,
  withMeta = true,
  withPagination = true,
}: PeopleSkeletonProps) => {
  return (
    <section aria-busy="true" aria-live="polite" className="space-y-8">
      {withHeader ? (
        <div className="space-y-6">
          <div className="h-3 w-40 rounded-full bg-default-300/70" />
          <div className="h-10 w-72 rounded-2xl bg-default-300/70" />
          <div className="h-4 w-[520px] max-w-full rounded-full bg-default-200/70" />
          <div className="flex flex-wrap gap-4">
            <div className="h-16 w-32 rounded-2xl bg-default-200/80" />
            <div className="h-16 w-32 rounded-2xl bg-default-200/80" />
          </div>
        </div>
      ) : null}

      {withFilters ? (
        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-default-200 bg-background/80 p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-12">
          <div className="h-14 rounded-2xl bg-default-200/80 lg:col-span-4" />
          <div className="h-14 rounded-2xl bg-default-200/80 lg:col-span-2" />
          <div className="h-14 rounded-2xl bg-default-200/80 lg:col-span-2" />
          <div className="h-14 rounded-2xl bg-default-200/80 lg:col-span-2" />
          <div className="h-14 rounded-2xl bg-default-200/80 lg:col-span-2" />
          <div className="h-10 w-32 rounded-full bg-default-200/80 lg:col-span-12" />
        </div>
      ) : null}

      {withMeta ? (
        <div className="flex items-center justify-between gap-3 text-sm text-default-500">
          <div className="h-4 w-48 rounded-full bg-default-200/70" />
          <div className="h-6 w-24 rounded-full bg-default-200/70" />
        </div>
      ) : null}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {skeletonItems.map((index) => (
          <div
            key={`skeleton-${index}`}
            className="flex h-full min-h-[440px] flex-col gap-4 rounded-2xl border border-default-200 bg-background/80 p-4 shadow-md"
          >
            <div className="h-56 rounded-2xl bg-default-200/80" />
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 rounded-full bg-default-200/80" />
              <div className="h-6 w-20 rounded-full bg-default-200/80" />
              <div className="h-6 w-24 rounded-full bg-default-200/80" />
            </div>
            <div className="h-4 w-36 rounded-full bg-default-200/70" />
            <div className="mt-auto h-10 rounded-xl bg-default-300/70" />
          </div>
        ))}
      </div>

      {withPagination ? (
        <div className="flex justify-center">
          <div className="h-10 w-64 rounded-full bg-default-200/80" />
        </div>
      ) : null}
    </section>
  );
};

export const PeopleGridSkeleton = () => (
  <PeopleSkeleton
    withPagination
    withFilters={false}
    withHeader={false}
    withMeta={false}
  />
);
