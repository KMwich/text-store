import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const SessionPage = lazy(() => import("@/pages/Session.page"));
const StorePage = lazy(() => import("@/pages/Store.page"));

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index Component={SessionPage} />
        <Route path="/session/:id" Component={StorePage} />
      </Routes>
    </BrowserRouter>
  );
}
