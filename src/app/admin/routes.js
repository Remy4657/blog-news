import TableList from "@/app/admin/TableList/TableList";

const dashboardRoutes = [
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
];

export default dashboardRoutes;
