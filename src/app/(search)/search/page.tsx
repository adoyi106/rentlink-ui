import FiltersPanel from "@/components/search/FiltersPanel";
import PropertyGrid from "@/components/search/PropertyGrid";

interface Props {
  searchParams: Promise<{ type?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const mode = type === "stays" ? "short-stay" : "long-term";

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <FiltersPanel mode={mode} />
      <PropertyGrid mode={mode} />
    </div>
  );
}
