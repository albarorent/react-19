import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";

export const getPlanets = async (): Promise<Planet[]> => {
  const res = await planetsApi.get("/");
  return res.data;
};

export const createPlanet = async (
  planet: Partial<Planet>
): Promise<Planet | null> => {
  try {
    const { data } = await planetsApi.post<Planet>("/", planet);

    return data;
  } catch (error) {
    return null;
  }
};

export const createPlanetActionForm = async (
  _prevState: unknown,
  queryData: FormData
) => {
  const formdata = Object.fromEntries(queryData.entries());
  console.log({ formdata });
  try {
    const { data } = await planetsApi.post<Planet>("/", formdata);

    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePlanet = async (
  planet: Partial<Planet>
): Promise<Planet> => {
  try {
   sleep();
    const { data } = await planetsApi.put<Planet>(`/${planet.id}`, planet);

    return data;
  } catch (error) {
    throw error;
  }
};

const sleep = () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};
