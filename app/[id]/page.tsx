import { Digimon } from "@/constants/index";
import { default as PageClient } from "./page-client";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  "use cache";

  const { id } = await props.params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list`);
  const data = await response.json();
  const filteredData = data.find((item: Digimon) => item.id === id);

  const relationDigimon = filteredData?.relations?.map((relation: string) => {
    const related = data.find((item: Digimon) => item.name === relation);
    return related ? { ...related } : relation;
  });
  if (filteredData) {
    filteredData.relations = relationDigimon;
  }

  return <PageClient digimon={filteredData} />;
}

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list`);
  const data = await response.json();
  return data.map((digimon: Digimon) => ({
    params: { id: digimon.id },
  }));
}
