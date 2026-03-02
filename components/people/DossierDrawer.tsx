"use client";

import type { Person } from "@/types/swapi";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
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

const formatMass = (mass: number | null) => (mass ? `${mass} kg` : "Unknown");

type DossierDrawerProps = {
  person: Person | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const DossierDrawer = ({
  person,
  isOpen,
  onOpenChange,
}: DossierDrawerProps) => {
  const [copied, setCopied] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [person?.avatarUrl]);

  const dossierText = useMemo(() => {
    if (!person) {
      return "";
    }

    return [
      `Name: ${person.name}`,
      `Gender: ${formatLabel(person.gender)}`,
      `Birth Year: ${person.birthYear}`,
      `Eye Color: ${formatLabel(person.eyeColor)}`,
      `Hair Color: ${person.hairColor}`,
      `Skin Color: ${person.skinColor}`,
      `Height: ${formatHeight(person.height)}`,
      `Mass: ${formatMass(person.mass)}`,
    ].join("\n");
  }, [person]);

  const handleCopy = async () => {
    if (!person) {
      return;
    }

    try {
      await navigator.clipboard.writeText(dossierText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="lg"
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.35em] text-default-400">
                Personnel Dossier
              </span>
              <span className="text-2xl font-semibold">
                {person ? person.name : ""}
              </span>
            </DrawerHeader>
            <DrawerBody className="gap-6">
              {person ? (
                <>
                  <div className="relative h-56 w-full overflow-hidden rounded-3xl bg-default-100">
                    <Skeleton
                      className="absolute inset-0 rounded-3xl"
                      isLoaded={isImageLoaded}
                    >
                      <div className="absolute inset-0 p-4">
                        <Image
                          fill
                          alt={`${person.name} portrait`}
                          className="object-contain"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          src={person.avatarUrl}
                          style={{ objectFit: "contain" }}
                          onLoad={() => setIsImageLoaded(true)}
                        />
                      </div>
                    </Skeleton>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip color="primary" variant="flat">
                      {formatLabel(person.gender)}
                    </Chip>
                    <Chip variant="flat">
                      {formatLabel(person.eyeColor)} eyes
                    </Chip>
                    <Chip variant="flat">Birth: {person.birthYear}</Chip>
                  </div>
                  <dl className="grid grid-cols-1 gap-4 rounded-2xl border border-default-200 bg-background/70 p-4 text-sm">
                    <div>
                      <dt className="text-default-500">Height</dt>
                      <dd className="text-base font-medium">
                        {formatHeight(person.height)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-default-500">Mass</dt>
                      <dd className="text-base font-medium">
                        {formatMass(person.mass)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-default-500">Hair color</dt>
                      <dd className="text-base font-medium">
                        {person.hairColor}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-default-500">Skin color</dt>
                      <dd className="text-base font-medium">
                        {person.skinColor}
                      </dd>
                    </div>
                  </dl>
                </>
              ) : null}
            </DrawerBody>
            <DrawerFooter className="flex flex-col gap-3">
              <Button
                className="w-full"
                color="primary"
                variant="shadow"
                onPress={handleCopy}
              >
                {copied ? "Dossier copied" : "Copy dossier"}
              </Button>
              <Button className="w-full" variant="bordered" onPress={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
