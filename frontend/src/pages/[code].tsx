import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../graphql/client";

export default function CountryDetails() {
  const router = useRouter();
  const { code } = router.query;
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
    skip: !code,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data?.country;

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="bg-pink-500 text-white py-2 px-4 mb-4 rounded"
      >
        Retour
      </button>
      <div className="flex flex-col items-center p-6">
        <p className="text-8xl mb-4">{country?.emoji}</p>
        <p className="text-lg mb-4">Name: {country?.name} ({country?.code})</p>
        {country?.continent?.name && (
          <p className="text-lg">Continent: {country?.continent?.name}</p>
        )}
      </div>
    </div>
  );
}
