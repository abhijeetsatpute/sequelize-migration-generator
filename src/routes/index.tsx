import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { FullPageCircularProgress } from "../components/full_page_circular_progress/full_page_circular_progress";
import MigrationGeneratorApp from "../components/migration_generator/migration_generator";

const Home = lazy(() => import("../components/home/home"));

const IndexRoutes = () => {
  return (
    <Suspense fallback={<FullPageCircularProgress />}>
      <Routes>
        <Route path={"/"} element={<MigrationGeneratorApp />} />
        {/* <Route path={"/"} element={<Home />} /> */}
      </Routes>
    </Suspense>
  );
};

export default IndexRoutes;
