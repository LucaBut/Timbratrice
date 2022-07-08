import Admin from "../pages/admin";
import Vista from "../pages/vista";

const routes = [
    { path: "/view", exact: true, name: 'View', component: Vista },
    { path: "/admin", exact: true, name: 'Dashboard', component: Admin }
];

export default routes;