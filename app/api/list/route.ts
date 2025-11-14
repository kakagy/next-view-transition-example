import data from "./digimon.json";

export async function GET(request: Request) {
  // const randomData = data.sort(() => 0.5 - Math.random()).slice(0, 24 * 12);

  const digimonData: any[] = [];
  data.forEach((item) => {
    digimonData.push({ ...item, imageSrc: `/output_images/${item.id}.webp` });
  });

  return Response.json(digimonData, { status: 200 });
}
