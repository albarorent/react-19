import { useOptimistic, useTransition } from "react";
import { updatePlanet } from "../../actions/planets";
import { Planet } from "../../interfaces/planet.interface";

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [optimisticPlanets, setOptimisticPlanets] = useOptimistic(
    planets,
    (current, newPlanet: Planet) => {
      const updatedPlanets = current.map((planet) =>
        planet.id === newPlanet.id ? newPlanet : planet
      );

      return updatedPlanets;
    }
  );

  const handleUpdate = async (planet: Planet) => {
    startTransition(async () => {
      const data = {
        ...planet,
        name: planet.name.toUpperCase(),
      };
      try {
        setOptimisticPlanets(data);
        const updatedPlanet = await updatePlanet(data);
        setOptimisticPlanets(updatedPlanet);
      } catch (error) {
        console.log(error);

        setOptimisticPlanets(planet);
      }
    });
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {optimisticPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>
          <br />
          <button
            disabled={isPending}
            onClick={() => handleUpdate(planet)}
            className="bg-blue-500 text-white disabled:bg-gray-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};
