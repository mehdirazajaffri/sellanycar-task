import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";

import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import CropsTable from "views/Tables/CropsTable";
import CropForm from "views/Forms/CropForm";
import TractorTable from "views/Tables/TractorTable";
import TractorForm from "views/Forms/TractorForm";
import FiledTable from "views/Tables/FiledTable";
import FieldForm from "views/Forms/FieldForm";
import ReactTables from "views/Tables/ReactTables";
import ProcessTable from "views/Tables/ProcessTable";
import ProcessForm from "views/Forms/ProcessForm";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Crops",
    rtlName: "الجداول",
    icon: GridOn,
    state: "cropsCollapse",
    views: [
      {
        path: "/crops",
        name: "Crops Data",
        rtlName: "طاولات عادية",
        mini: "RT",
        rtlMini: "صر",
        component: CropsTable,
        layout: "/admin"
      },
      {
        path: "/add-crop",
        name: "Add Crop",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: CropForm,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Tractors",
    rtlName: "الجداول",
    icon: GridOn,
    state: "tractorsCollapse",
    views: [
      {
        path: "/tractors",
        name: "Tractors Data",
        rtlName: "طاولات عادية",
        mini: "RT",
        component: TractorTable,
        layout: "/admin"
      },
      {
        path: "/add-tractor",
        name: "Add Tractor",
        rtlName: "أشكال عادية",
        mini: "RF",
        component: TractorForm,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Field",
    rtlName: "الجداول",
    icon: GridOn,
    state: "fieldsCollapse",
    views: [
      {
        path: "/fields",
        name: "Field Data",
        rtlName: "طاولات عادية",
        mini: "RT",
        component: FiledTable,
        layout: "/admin"
      },
      {
        path: "/add-field",
        name: "Add Fields",
        rtlName: "أشكال عادية",
        mini: "RF",
        component: FieldForm,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Field Processing",
    rtlName: "الجداول",
    icon: GridOn,
    state: "fieldsProcessingCollapse",
    views: [
      {
        path: "/processes",
        name: "Field Processes Data",
        rtlName: "طاولات عادية",
        mini: "RT",
        component: ProcessTable,
        layout: "/admin"
      },
      {
        path: "/add-field-process",
        name: "Add Process Data",
        rtlName: "أشكال عادية",
        mini: "RF",
        component: ProcessForm,
        layout: "/admin"
      }
    ]
  }
];
export default dashRoutes;
