import { ViewTransition } from "react";
import { Digimon } from "@/constants";
import { DigimonDescription } from "./components/digimon-description";
import { DigimonHeader } from "./components/digimon-header";
import { DigimonInfo } from "./components/digimon-info";
import { DigimonRelations } from "./components/digimon-relations";
import Link from "next/link";

type DigimonDetailProps = {
  digimon: Digimon | null;
};

const DigimonDetail = ({ digimon }: DigimonDetailProps) => {
  if (!digimon) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Loading...
      </div>
    );
  }

  return (
    <ViewTransition>
      <article className="container mx-auto px-4 py-8 max-w-4xl z-10">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-blue-500 hover:underline" shallow>
            ← 戻る
          </Link>
        </div>

        <div>
          <DigimonHeader
            id={digimon.id}
            name={digimon.name}
            imageSrc={digimon.imageSrc}
          />

          <DigimonInfo
            level={digimon.level}
            type={digimon.type}
            attribute={digimon.attribute}
            skill={digimon.skill}
          />

          <DigimonDescription description={digimon.description} />

          <DigimonRelations relations={digimon.relations} />
        </div>
      </article>
    </ViewTransition>
  );
};

export default DigimonDetail;
