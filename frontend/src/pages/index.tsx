import { useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import type { Country } from "../types";
import { ADD_COUNTRY, GET_COUNTRIES, GET_CONTINENTS } from "../graphql/client";

export default function Home() {
  const {
    data: countriesData,
    loading: countriesLoading,
    error: countriesError,
  } = useQuery(GET_COUNTRIES);
  const {
    data: continentsData,
    loading: continentsLoading,
    error: continentsError,
  } = useQuery(GET_CONTINENTS);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [continent, setContinent] = useState("");
  const [addCountry] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
  });
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const isCountryCodeTaken = countriesData?.countries.some(
    (country: Country) => country.code === code
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !code || !emoji) {
      setErrorForm("Name, Code, and Emoji cannot be empty.");
      return;
    }

    console.log(code.length);
    
    if (code.length > 2) {
      setErrorForm("Code must be 2 characters long.");
      return;
    }

    if (isCountryCodeTaken) {
      setErrorForm("A country with that code already exists.");
      return;
    }

    const continentId = parseInt(continent, 10);

    const countryData: {
      name: string;
      code: string;
      emoji: string;
      continent?: { id: number };
    } = {
      name,
      code,
      emoji,
    };

    if (!isNaN(continentId)) {
      countryData.continent = { id: continentId };
    }

    await addCountry({ variables: { data: countryData } });

    setName("");
    setCode("");
    setEmoji("");
    setContinent("");
    setErrorForm(null);
  };

  if (countriesLoading || continentsLoading) return <p>Loading...</p>;
  if (countriesError || continentsError)
    return (
      <p>
        Error loading data:{" "}
        {countriesError?.message || continentsError?.message}
      </p>
    );

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countriesData.countries.map((country: Country) => (
          <Link href={`/${country.code}`} key={country.code}>
            <div className="border p-4 rounded-lg shadow cursor-pointer">
              <p className="text-2xl">{country.emoji}</p>
              <p>{country.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        {errorForm && <p className="text-red-500 mb-4">{errorForm}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="flex flex-col">
            <label className="text-left font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-left font-medium mb-1">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-left font-medium mb-1">Emoji</label>
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-left font-medium mb-1">Continent</label>
            <select
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="" disabled>
                Select a continent
              </option>
              {continentsData.continents.map(
                (cont: { id: string; name: string }) => (
                  <option key={cont.id} value={cont.id}>
                    {cont.name}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-pink-500 py-2 px-4 rounded hover:bg-pink-600 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
