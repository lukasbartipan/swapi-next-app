"use client";

import type { SharedSelection } from "@heroui/system";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

const selectionToValue = (keys: SharedSelection): string | null => {
  if (keys === "all") {
    return null;
  }

  const [first] = Array.from(keys);

  return first ? String(first) : null;
};

export type FilterOption = {
  value: string;
  label: string;
};

export type PeopleFiltersProps = {
  query: string;
  gender: string | null;
  eyeColor: string | null;
  heightMin: string;
  heightMax: string;
  genderOptions: FilterOption[];
  eyeColorOptions: FilterOption[];
  onQueryChange: (value: string) => void;
  onGenderChange: (value: string | null) => void;
  onEyeColorChange: (value: string | null) => void;
  onHeightMinChange: (value: string) => void;
  onHeightMaxChange: (value: string) => void;
  onClearFilters: () => void;
};

export const PeopleFilters = ({
  query,
  gender,
  eyeColor,
  heightMin,
  heightMax,
  genderOptions,
  eyeColorOptions,
  onQueryChange,
  onGenderChange,
  onEyeColorChange,
  onHeightMinChange,
  onHeightMaxChange,
  onClearFilters,
}: PeopleFiltersProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-3xl border border-default-200 bg-background/80 p-4 shadow-sm backdrop-blur-md sm:grid-cols-2 lg:grid-cols-12">
      <Input
        aria-label="Search by name"
        className="lg:col-span-4"
        label="Search"
        placeholder="Search by name"
        type="search"
        value={query}
        onValueChange={onQueryChange}
      />
      <Select
        aria-label="Filter by gender"
        className="lg:col-span-2"
        label="Gender"
        placeholder="All"
        selectedKeys={gender ? new Set([gender]) : new Set()}
        onSelectionChange={(keys) => onGenderChange(selectionToValue(keys))}
      >
        {genderOptions.map((option) => (
          <SelectItem key={option.value} textValue={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        aria-label="Filter by eye color"
        className="lg:col-span-2"
        label="Eye color"
        placeholder="All"
        selectedKeys={eyeColor ? new Set([eyeColor]) : new Set()}
        onSelectionChange={(keys) => onEyeColorChange(selectionToValue(keys))}
      >
        {eyeColorOptions.map((option) => (
          <SelectItem key={option.value} textValue={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Input
        aria-label="Minimum height in centimeters"
        className="lg:col-span-2"
        label="Height min (cm)"
        min="0"
        placeholder="Any"
        type="number"
        value={heightMin}
        onValueChange={onHeightMinChange}
      />
      <Input
        aria-label="Maximum height in centimeters"
        className="lg:col-span-2"
        label="Height max (cm)"
        min="0"
        placeholder="Any"
        type="number"
        value={heightMax}
        onValueChange={onHeightMaxChange}
      />
      <div className="flex items-end lg:col-span-12">
        <Button
          className="w-full sm:w-auto"
          variant="bordered"
          onPress={onClearFilters}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
};
