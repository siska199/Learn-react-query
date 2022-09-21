import { useState } from "react";
import { useQuery } from "react-query";
const fetchPlanets = async ({queryKey}) => {
  const [kind,page] = queryKey
  console.log("pages")
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

function App() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets",page], fetchPlanets, {
    onSuccess: () => console.log("notifiacation success"),
  });

  if (status === "loading") {
    return <h1>Loading</h1>;
  }
  if (status === "error") {
    return <h1>Error</h1>;
  }
  console.log("status: ", status);
  return (
    <div>
      <button onClick={() => setPage((prev) => prev + 1)}>Update page </button>
      {data?.results?.map((data, i) => (
        <div key={i}>{data.name}</div>
      ))}
    </div>
  );
}

export default App;
