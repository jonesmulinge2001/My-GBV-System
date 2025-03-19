import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Analytics = () => {
    const [genderData, setGenderData] = useState([]);
    const [ageData, setAgeData] = useState([]);
    const [supportData, setSupportData] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/analytics/cases-by-category");

            console.log("API Response:", response.data);

            setGenderData(response.data.genderData || []);
            setAgeData(response.data.ageData || []);
            setSupportData(response.data.supportData || []);
        } catch (error) {
            console.error("Error fetching analytics data:", error);
        }
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF5678"];

    return (
        <div ref={containerRef} className="p-6 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📊 Case Reporting Analytics</h2>

            {/* Responsive Chart Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Gender Distribution Pie Chart */}
                {genderData.length > 0 && (
                    <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Cases by Gender</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={genderData} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                                    {genderData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Age Distribution Bar Chart */}
                {ageData.length > 0 && (
                    <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Cases by Age</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="age" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Support Needed Pie Chart */}
                {supportData.length > 0 && (
                    <div className="bg-white shadow-lg p-4 rounded-xl flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Types of Support Needed</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={supportData} dataKey="count" nameKey="support_needed" cx="50%" cy="50%" outerRadius={80} fill="#FF8042">
                                    {supportData.map((_, index) => (    
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Analytics;
