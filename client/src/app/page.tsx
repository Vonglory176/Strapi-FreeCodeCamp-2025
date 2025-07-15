import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader() {
  const data = await getHomePage()
  if (!data) notFound()
  
  return { ...data.data }
}

export default async function HomeRoute() {
  const data = await loader();
  console.log(data);
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
