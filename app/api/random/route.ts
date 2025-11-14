export async function GET(request: Request) {
  async function fetchData(): Promise<any[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/list`,
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
  const data = await fetchData();

  const randomData = data.sort(() => 0.5 - Math.random()).slice(0, 24 * 12);

  return Response.json(randomData, { status: 200 });
}
