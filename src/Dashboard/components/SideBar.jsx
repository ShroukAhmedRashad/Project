/*
- File Name: SideBar.jsx
- Author: shrouk ahmed
- Date of Creation: 17/9/2024
- Versions Information: 1.0.0
- Dependencies:
  {
  REACT , 
  MUI ,
  react-router-dom ,
  react-icons,
  framer-motion,
  sideBar.css,
  SidebarMenu file
  }
- Contributors: shrouk ahmed , rania rabie ,nourhan khaled
- Last Modified Date: 1/11/2024
- Description : dashboard sidebar
*/


import { NavLink } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { BiAnalyse } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "../components/SidebarMenu";

import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import "./sideBar.css";
import { useTheme } from "@mui/material";



const routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: <FaHome />,
  },

  {
    path: "/Analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
    subRoutes: [
      {
        path: "/dashboard/barchart",
        name: "Bar Chart ",
        icon: <BarChartIcon />,
      },
      {
        path: "/dashboard/linechart",
        name: "Line Chart",
        icon: <ShowChartIcon />,
      },
      {
        path: "/dashboard/piechart",
        name: "Pie Chart",
        icon: <PieChartIcon />,
      },
    ],
  },

  {
    path: "/Users",
    name: "Users",
    icon: <GroupIcon />,
    subRoutes: [
      {
        path: "/dashboard/allusers",
        name: "All Users ",
        icon: <PersonSearchIcon />,
      },
      {
        path: "/dashboard/addnewuser",
        name: "Add New User",
        icon: <PersonAddIcon />,
      },
    ],
  },

  

  {
    path: "/dashboard/roadmap",
    name: "Roadmap",
    icon: <AddRoadIcon />,
    subRoutes: [
      {
        path: "/dashboard/allroadmaps",
        name: "All Roadmaps",
        icon: <EditRoadIcon />,
      },
    ],
  },

  {
    path: "/dashboard/faq",
    name: "FAQ",
    icon: <LiveHelpIcon />,
    exact: true,
  },

  {
    path: "/dashboard/setting",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const theme = useTheme()

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div >
        <div>
          <motion.div
            animate={{
              width: isOpen ? "200px" : "45px",
              transition: { duration: 0.5, type: "spring", damping: 10 },
            }}
            className={`sidebar`}
            style={{ backgroundColor: theme.palette.mode === "dark" ? "#1d242f" : "#1d242f",}}
          >
            <div className="top_section">
              <AnimatePresence>
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                  >
                    Dashboard
                  </motion.h1>
                )}
              </AnimatePresence>

              <div className="bars" onClick={toggle}>
                <FaBars />
              </div>
            </div>

            <section className="routes">
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                      key={index}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          </motion.div>
          <motion.main
        animate={{
          marginLeft: isOpen ? "170px" : "45px",
          transition: { duration: 0.5 },
        }}
        className="main-content"
      >
        {children}
      </motion.main>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default SideBar;















// import React from "react";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import { Avatar, styled, Typography, useTheme } from "@mui/material";
// import MuiDrawer from "@mui/material/Drawer";

// import { useLocation, useNavigate } from "react-router-dom";
// import { grey } from "@mui/material/colors";


// import BarChartIcon from "@mui/icons-material/BarChart";
// import PieChartIcon from "@mui/icons-material/PieChart";
// import ShowChartIcon from "@mui/icons-material/ShowChart";
// import GroupIcon from "@mui/icons-material/Group";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import PersonSearchIcon from "@mui/icons-material/PersonSearch";
// import AddRoadIcon from "@mui/icons-material/AddRoad";
// import EditRoadIcon from "@mui/icons-material/EditRoad";
// import LiveHelpIcon from "@mui/icons-material/LiveHelp";
// import { FaBars, FaHome } from "react-icons/fa";
// import { BiAnalyse, BiCog } from "react-icons/bi";


// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(
//   // @ts-ignore
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//     boxSizing: "border-box",
//     ...(open && {
//       ...openedMixin(theme),
//       "& .MuiDrawer-paper": openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       "& .MuiDrawer-paper": closedMixin(theme),
//     }),
//   })
// );

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const routes = [
//   {
//     path: "/dashboard",
//     name: "Home",
//     icon: <FaHome />,
//   },

//   {
//     path: "/Analytics",
//     name: "Analytics",
//     icon: <BiAnalyse />,
//     subRoutes: [
//       {
//         path: "/dashboard/barchart",
//         name: "Bar Chart ",
//         icon: <BarChartIcon />,
//       },
//       {
//         path: "/dashboard/linechart",
//         name: "Line Chart",
//         icon: <ShowChartIcon />,
//       },
//       {
//         path: "/dashboard/piechart",
//         name: "Pie Chart",
//         icon: <PieChartIcon />,
//       },
//     ],
//   },

//   {
//     path: "/Users",
//     name: "Users",
//     icon: <GroupIcon />,
//     subRoutes: [
//       {
//         path: "/dashboard/allusers",
//         name: "All Users ",
//         icon: <PersonSearchIcon />,
//       },
//       {
//         path: "/dashboard/addnewuser",
//         name: "Add New User",
//         icon: <PersonAddIcon />,
//       },
//     ],
//   },

  

//   {
//     path: "/dashboard/roadmap",
//     name: "Roadmap",
//     icon: <AddRoadIcon />,
//     subRoutes: [
//       {
//         path: "/dashboard/allroadmaps",
//         name: "All Roadmaps",
//         icon: <EditRoadIcon />,
//       },
//     ],
//   },

//   {
//     path: "/dashboard/faq",
//     name: "FAQ",
//     icon: <LiveHelpIcon />,
//     exact: true,
//   },

//   {
//     path: "/dashboard/setting",
//     name: "Settings",
//     icon: <BiCog />,
//     exact: true,
//   },
// ];

// const SideBar = ({ open, handleDrawerClose }) => {
//   let location = useLocation();
//   const navigate = useNavigate();

//   const showAnimation = {
//     hidden: {
//       width: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     show: {
//       opacity: 1,
//       width: "auto",
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };
  
//   const theme = useTheme();
//   return (
//     <Drawer variant="permanent" open={open}>
//       <DrawerHeader>
//         <IconButton onClick={handleDrawerClose}>
//           {theme.direction === "rtl" ? (
//             <ChevronRightIcon />
//           ) : (
//             <ChevronLeftIcon />
//           )}
//         </IconButton>
//       </DrawerHeader>
//       <Divider />


//       <List>
//         {routes.map((item) => (
//           <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
//             <ListItemButton
//               onClick={() => {
//                 navigate(item.path);
//               }}
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//                 // عايزة اقوله لما المسار بتاعك يساوي المسار اللي فوق غيرلي الخلفية
//                 // location.pathname => / بيجيبلي اللي بعد
//                 bgcolor:
//                   location.pathname === item.path
//                     ? theme.palette.mode === "dark"
//                       ?  grey[800]
//                       : grey[300]
//                     : null,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.text}
//                 sx={{ opacity: open ? 1 : 0 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>


//     </Drawer>
//   );
// };
// export default SideBar;
