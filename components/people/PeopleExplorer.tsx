"use client";

import type { Person } from "@/types/swapi";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pagination } from "@heroui/pagination";
import { motion } from "framer-motion";

import { DossierDrawer } from "@/components/people/DossierDrawer";
import { FilterOption, PeopleFilters } from "@/components/people/PeopleFilters";
import { PeopleCard } from "@/components/people/PeopleCard";
import { PeopleGridSkeleton } from "@/components/people/PeopleSkeleton";

const PAGE_SIZE = 15;

const formatLabel = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Unknown";
  }

  if (trimmed.toLowerCase() === "n/a") {
    return "N/A";
  }

  if (trimmed.toLowerCase() === "unknown") {
    return "Unknown";
  }

  return trimmed
    .split(/\s+/u)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const normalizeToken = (value: string) => value.trim().toLowerCase();

const splitTokens = (value: string) =>
  value
    .split(/,|\//u)
    .map((token) => normalizeToken(token))
    .filter(Boolean);

type PeopleExplorerProps = {
  people: Person[];
};

export const PeopleExplorer = ({ people }: PeopleExplorerProps) => {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [eyeColor, setEyeColor] = useState<string | null>(null);
  const [heightMin, setHeightMin] = useState("");
  const [heightMax, setHeightMax] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Person | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showGridSkeleton, setShowGridSkeleton] = useState(true);
  const [fontsReady, setFontsReady] = useState(false);
  const hasRevealedRef = useRef(false);

  const genderOptions = useMemo<FilterOption[]>(() => {
    const values = new Set<string>();

    people.forEach((person) => {
      const value = normalizeToken(person.gender);

      if (value) {
        values.add(value);
      }
    });

    return Array.from(values)
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({
        value,
        label: formatLabel(value),
      }));
  }, [people]);

  const eyeColorOptions = useMemo<FilterOption[]>(() => {
    const values = new Set<string>();

    people.forEach((person) => {
      splitTokens(person.eyeColor).forEach((token) => values.add(token));
    });

    return Array.from(values)
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({
        value,
        label: formatLabel(value),
      }));
  }, [people]);

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeToken(query);
    const minHeight = heightMin ? Number.parseInt(heightMin, 10) : null;
    const maxHeight = heightMax ? Number.parseInt(heightMax, 10) : null;

    return people
      .filter((person) => {
        if (
          normalizedQuery &&
          !person.name.toLowerCase().includes(normalizedQuery)
        ) {
          return false;
        }

        if (gender && person.gender !== gender) {
          return false;
        }

        if (eyeColor) {
          const tokens = splitTokens(person.eyeColor);

          if (!tokens.includes(eyeColor)) {
            return false;
          }
        }

        if (minHeight !== null) {
          if (person.height === null || person.height < minHeight) {
            return false;
          }
        }

        if (maxHeight !== null) {
          if (person.height === null || person.height > maxHeight) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [people, query, gender, eyeColor, heightMin, heightMax]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const currentPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setPage(1);
  }, [query, gender, eyeColor, heightMin, heightMax]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  useEffect(() => {
    if (filtered.length === 0) {
      setShowGridSkeleton(false);
    }
  }, [filtered.length]);

  useEffect(() => {
    let cancelled = false;

    const markReady = () => {
      if (!cancelled) {
        setFontsReady(true);
      }
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(markReady).catch(markReady);
    } else {
      const timer = window.setTimeout(markReady, 150);

      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCardImageLoad = useCallback(() => {
    if (hasRevealedRef.current) {
      return;
    }

    hasRevealedRef.current = true;
    window.setTimeout(() => setShowGridSkeleton(false), 120);
  }, []);

  const handleOpenDossier = (person: Person) => {
    setSelected(person);
    setIsDrawerOpen(true);
  };

  const handleDrawerChange = (open: boolean) => {
    setIsDrawerOpen(open);
    if (!open) {
      setSelected(null);
    }
  };

  const handleClearFilters = () => {
    setQuery("");
    setGender(null);
    setEyeColor(null);
    setHeightMin("");
    setHeightMax("");
  };

  return (
    <section className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          {fontsReady ? (
            <>
              <span className="text-xs uppercase tracking-[0.4em] text-default-500">
                Alliance Intelligence
              </span>
              <h1 className="text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
                Personnel Archive
              </h1>
              <p className="max-w-2xl text-base text-default-600 sm:text-lg">
                Browse every known individual in the Star Wars galaxy. Filter by
                physical attributes, scan dossiers, and compile mission-ready
                summaries.
              </p>
            </>
          ) : (
            <>
              <div className="h-3 w-40 rounded-full bg-default-300/70" />
              <div className="h-10 w-72 rounded-2xl bg-default-300/70" />
              <div className="h-4 w-[520px] max-w-full rounded-full bg-default-200/70" />
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="rounded-2xl border border-default-200 bg-background/80 px-4 py-3 text-sm shadow-sm backdrop-blur">
            <div className="text-default-500">Total profiles</div>
            {fontsReady ? (
              <div className="text-lg font-semibold text-foreground">
                {people.length}
              </div>
            ) : (
              <div className="mt-2 h-6 w-12 rounded-full bg-default-200/70" />
            )}
          </div>
          <div className="rounded-2xl border border-default-200 bg-background/80 px-4 py-3 text-sm shadow-sm backdrop-blur">
            <div className="text-default-500">Results</div>
            {fontsReady ? (
              <div className="text-lg font-semibold text-foreground">
                {filtered.length}
              </div>
            ) : (
              <div className="mt-2 h-6 w-12 rounded-full bg-default-200/70" />
            )}
          </div>
        </div>
      </div>

      <PeopleFilters
        eyeColor={eyeColor}
        eyeColorOptions={eyeColorOptions}
        gender={gender}
        genderOptions={genderOptions}
        heightMax={heightMax}
        heightMin={heightMin}
        query={query}
        onClearFilters={handleClearFilters}
        onEyeColorChange={setEyeColor}
        onGenderChange={setGender}
        onHeightMaxChange={setHeightMax}
        onHeightMinChange={setHeightMin}
        onQueryChange={setQuery}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-default-500">
        <span>
          Showing {paged.length} of {filtered.length} results
        </span>
        <span className="rounded-full border border-default-200 bg-background/80 px-3 py-1 text-xs text-default-600">
          Page {currentPage} of {totalPages}
        </span>
        <span aria-live="polite" className="sr-only">
          {filtered.length} results
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-default-300 bg-background/70 p-10 text-center text-default-500">
          No personnel match those filters. Try adjusting your search.
        </div>
      ) : (
        <div className="relative">
          {showGridSkeleton ? (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <PeopleGridSkeleton />
            </div>
          ) : null}
          <motion.div
            animate="visible"
            aria-hidden={showGridSkeleton}
            className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ${
              showGridSkeleton ? "invisible pointer-events-none" : ""
            }`}
            initial="hidden"
            tabIndex={showGridSkeleton ? -1 : undefined}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            }}
          >
            {paged.map((person) => (
              <motion.div
                key={person.id}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <PeopleCard
                  person={person}
                  onImageLoad={handleCardImageLoad}
                  onOpen={handleOpenDossier}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="flex justify-center">
          <Pagination
            showControls
            color="primary"
            page={currentPage}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      ) : null}

      <DossierDrawer
        isOpen={isDrawerOpen}
        person={selected}
        onOpenChange={handleDrawerChange}
      />
    </section>
  );
};
