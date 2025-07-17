import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import HomePage from "./pages/home/HomePage/HomePage";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    dashboard={HomePage}
  >
    <Resource
      name="dashboard"
    />
  </Admin>
);
