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
import { FaBookReader, FaImages, FaPersonBooth, FaUsers } from "react-icons/fa";

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
         {title} : {count}
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
  const [userData, setUserData] = useState([]);
  const [artworkData, setArtworkData] = useState([]);
  const [exhibitionData, setExhibitionData] = useState([]);
  const [materialData, setMaterialData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, artworkResponse, exhibitionResponse, materialResponse] = await Promise.all([
          axios.get('http://localhost:8080/user'),
          axios.get('http://localhost:8080/artwork'),
          axios.get('http://localhost:8080/exhibition'),
          axios.get('http://localhost:8080/material'),
        ]);
  
        setUserData(userResponse.data.data);
        setArtworkData(artworkResponse.data.data);
        setExhibitionData(exhibitionResponse.data.data);
        setMaterialData(materialResponse.data.data);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); 
  
  useEffect(() => {
    console.log('Total User Count:', userData?.length || 0);
  }, [userData]);
  
  useEffect(() => {
    console.log('Total Artwork Count:', artworkData?.length || 0);
  }, [artworkData]);
  
  useEffect(() => {
    console.log('Total Exhibition Count:', exhibitionData?.length || 0);
  }, [exhibitionData]);
  
  useEffect(() => {
    console.log('Total Material Count:', materialData?.length || 0);
  }, [materialData]);
  

  const totalUserCount = userData.length;
  const totalArtworkCount = artworkData.length;
  const totalExhibitionCount = exhibitionData.length;
  const totalMaterialCount = materialData.length;
  
  console.log('Total User Count:', totalUserCount);
  console.log('Total Artwork Count:', totalArtworkCount);
  console.log('Total Exhibition Count:', totalExhibitionCount);
  console.log('Total Material Count:', totalMaterialCount);

  const userIcon = <FaUsers/>;
  const artworkIcon = (
    <FaImages />
  );
  const exhibitionIcon = (
    <FaPersonBooth />
  );
  const materialIcon = (
    <FaBookReader />
  );

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentYear = currentDate.getFullYear();

 
  const getLast5Months = () => {
    const months = [];
    for (let i = 0; i < 5; i++) {
      const month = (currentMonth - i + 12) % 12 || 12;
      months.unshift(`${currentYear}-${month}`);
    }
    return months;
  };

  const last5Months = getLast5Months();

  const filterDataByLast5Months = (data, dataKey) => {
    if (Array.isArray(data)) {
      const aggregatedData = {};
      data.forEach((item) => {
        const createdAt = item.created_at;
        if (createdAt) {
          const itemDate = new Date(createdAt);
          const itemMonth = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}`;
          aggregatedData[itemMonth] = (aggregatedData[itemMonth] || 0) + 1;
        }
      });
  
      return Object.keys(aggregatedData).map((month) => ({
        month,
        [dataKey]: aggregatedData[month],
      }));
    }
    return [];
  };
  

  const dummyData = [
    { month: "2023-05", userCount: 15, artworkCount: 20, exhibitionCount: 10, materialCount: 5 },
    { month: "2023-06", userCount: 18, artworkCount: 25, exhibitionCount: 12, materialCount: 8 },
    { month: "2023-07", userCount: 20, artworkCount: 30, exhibitionCount: 15, materialCount: 10 },
    { month: "2023-08", userCount: 22, artworkCount: 35, exhibitionCount: 18, materialCount: 12 },
    { month: "2023-09", userCount: 25, artworkCount: 40, exhibitionCount: 20, materialCount: 15 },
  ];

  const userChart = (
    <LineChartContainer data={dummyData} dataKey="userCount" name="User" />
  );
  const artworkChart = (
    <LineChartContainer data={dummyData} dataKey="artworkCount" name="Artwork" />
  );
  const exhibitionChart = (
    <LineChartContainer data={dummyData} dataKey="exhibitionCount" name="Exhibition" />
  );
  const materialChart = (
    <LineChartContainer data={dummyData} dataKey="materialCount" name="Material" />
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
