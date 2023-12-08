import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from "@coreui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/General/Sidebar";

const DashboardCard = ({ title, date, count, icon }) => (
  <Card className="bg-red-200 rounded-md p-4 mb-3  w-100">
    <CardContent>
      <Box className="flex items-center justify-between">
        <Box className="bg-red-400 rounded-full p-2 mr-3">{icon}</Box>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Typography variant="body2" className="text-red-600 mt-2">
        {date}
      </Typography>
      <Typography variant="h5" className="my-3">
        {count} {title}
      </Typography>
      <Typography variant="body2" className="text-red-600">
        Updated today
      </Typography>
    </CardContent>
  </Card>
);

const LineChartContainer = ({ data, dataKey, name }) => (
  <Box className="mt-8">
    <Typography variant="h6" className="mb-4">
      {name} Chart
    </Typography>
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
    </LineChart>
  </Box>
);

export default function AdminDashboard() {
  // const [userData, setUserData] = useState([]);
  // const [artworkData, setArtworkData] = useState([]);
  // const [exhibitionData, setExhibitionData] = useState([]);
  // const [materialData, setMaterialData] = useState([]);

  const [userData, setUserData] = useState([
    { month: "Jan", userCount: 10 },
    { month: "Feb", userCount: 15 },
    { month: "Mar", userCount: 8 },
    // ... Add more data as needed
  ]);

  const [artworkData, setArtworkData] = useState([
    { month: "Jan", artworkCount: 20 },
    { month: "Feb", artworkCount: 25 },
    { month: "Mar", artworkCount: 18 },
    // ... Add more data as needed
  ]);

  const [exhibitionData, setExhibitionData] = useState([
    { month: "Jan", exhibitionCount: 5 },
    { month: "Feb", exhibitionCount: 8 },
    { month: "Mar", exhibitionCount: 3 },
    // ... Add more data as needed
  ]);

  const [materialData, setMaterialData] = useState([
    { month: "Jan", materialCount: 12 },
    { month: "Feb", materialCount: 10 },
    { month: "Mar", materialCount: 15 },
    // ... Add more data as needed
  ]);

  useEffect(() => {
    // Fetch data from API and set the state variables
  }, []);

  const userIcon = <Avatar alt="User Icon" src="/path/to/user-icon.png" />;
  const artworkIcon = (
    <Avatar alt="Artwork Icon" src="/path/to/artwork-icon.png" />
  );
  const exhibitionIcon = (
    <Avatar alt="Exhibition Icon" src="/path/to/exhibition-icon.png" />
  );
  const materialIcon = (
    <Avatar alt="Material Icon" src="/path/to/material-icon.png" />
  );

  // Placeholder data for Line Charts
  const userChart = (
    <LineChartContainer data={userData} dataKey="userCount" name="User" />
  );
  const artworkChart = (
    <LineChartContainer
      data={artworkData}
      dataKey="artworkCount"
      name="Artwork"
    />
  );
  const exhibitionChart = (
    <LineChartContainer
      data={exhibitionData}
      dataKey="exhibitionCount"
      name="Exhibition"
    />
  );
  const materialChart = (
    <LineChartContainer
      data={materialData}
      dataKey="materialCount"
      name="Material"
    />
  );

  return (
    <div className="container flex">
      <Sidebar />
      <div className="flex flex-col p-5">
        <h1 className="py-1 text-center">Dashboard</h1>

        <div className="flex space-x-4 items-center ml-14">
          <DashboardCard
            title="Total User"
            date="10/12/2023"
            count={userData.length}
            icon={userIcon}
          />
          <DashboardCard
            title="Total Artwork"
            date="10/12/2023"
            count={artworkData.length}
            icon={artworkIcon}
          />
        </div>

        <div className="flex space-x-4 ml-14">
          <DashboardCard
            title="Total Exhibition"
            date="10/12/2023"
            count={exhibitionData.length}
            icon={exhibitionIcon}
          />
          <DashboardCard
            title="Total Material"
            date="10/12/2023"
            count={materialData.length}
            icon={materialIcon}
          />
        </div>

        <div className="flex space-x-4 ml-14">
          {userChart}
          {artworkChart}
        </div>
        <div className="flex space-x-4 ml-14">
          {exhibitionChart}
          {materialChart}
        </div>
      </div>
    </div>
  );
}
