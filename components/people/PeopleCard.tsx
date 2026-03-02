"use client";

import type { Person } from "@/types/swapi";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";

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

const formatHeight = (height: number | null) =>
  height ? `${height} cm` : "Unknown";

type PeopleCardProps = {
  person: Person;
  onOpen: (person: Person) => void;
  onImageLoad?: () => void;
};

export const PeopleCard = ({
  person,
  onOpen,
  onImageLoad,
}: PeopleCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [person.avatarUrl]);

  return (
    <Card className="h-full min-h-[440px] border border-default-200 bg-background/80 shadow-md backdrop-blur">
      <CardHeader className="flex flex-col items-start gap-3">
        <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-default-100">
          <Skeleton
            className="absolute inset-0 rounded-2xl"
            isLoaded={isImageLoaded}
          >
            <div className="absolute inset-0 p-3">
              <Image
                fill
                alt={`${person.name} portrait`}
                className="object-contain"
                priority={person.id <= 5}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                src={person.avatarUrl}
                style={{ objectFit: "contain" }}
                onLoad={() => {
                  setIsImageLoaded(true);
                  onImageLoad?.();
                }}
              />
            </div>
          </Skeleton>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              Classified
            </p>
            <h3 className="text-lg font-semibold text-white">{person.name}</h3>
          </div>
        </div>
      </CardHeader>
      <CardBody className="gap-3 pt-0">
        <div className="flex flex-wrap gap-2">
          <Chip color="primary" variant="flat">
            {formatLabel(person.gender)}
          </Chip>
          <Chip variant="flat">{formatLabel(person.eyeColor)} eyes</Chip>
          <Chip variant="flat">Height: {formatHeight(person.height)}</Chip>
        </div>
        <div className="text-sm text-default-500">
          <span className="font-semibold text-default-700">Birth year:</span>{" "}
          {person.birthYear}
        </div>
      </CardBody>
      <CardFooter className="mt-auto">
        <Button
          className="w-full"
          color="primary"
          variant="shadow"
          onPress={() => onOpen(person)}
        >
          Open dossier
        </Button>
      </CardFooter>
    </Card>
  );
};
