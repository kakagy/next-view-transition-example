import { ViewTransition } from "react";
import { DigimonList } from "../components/digimon-list";
import { Digimon } from "@/constants";
import DigimonTitle from "@/components/digimon-title";

async function fetchData(): Promise<Digimon[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/random`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch digimons: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching digimons:", error);
    return [];
  }
}

export default async function Page() {
  const data = await fetchData();

  return (
    <ViewTransition>
      <div className="container mx-auto">
        <DigimonTitle />
        <DigimonList digimons={data} />
      </div>
    </ViewTransition>
  );
}
