import { Suspense } from "react";
import { getPlanets } from "./actions/planets";
import Planets from "./pages/Planets";
import { ErrorBoundary } from "./shared/ErrorBoundary";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Planetas del Sistema Solar</h1>

      <ErrorBoundary fallback={<h1>Algo salió mal</h1>}>
        <Suspense fallback={<p>Cargando...</p>}>
          <Planets getPlanets={getPlanets()} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
