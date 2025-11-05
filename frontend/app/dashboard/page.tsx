"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Option 2: Import as any (if you're still having type issues)
const ToasterAny = Toaster as any;
import { motion } from "framer-motion";
import { useAuth } from "../AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Report {
  id: number;
  date: string;
  tasks: string;
  timings: string;
  notes: string;
  userId: string;
  userName: string;
  userRole: string;
}

interface User {
  id: string;
  name: string;
  role: string;
  _count: { reports: number };
}

const MotionDiv: any = motion.div;

export default function AdminDashboard() {
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filterName, setFilterName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reportsPerPage = 4;

  const router = useRouter();
  const { user, token, logout } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // ✅ environment variable

  const fetchData = async () => {
    if (!token || !user) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          name: filterName || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });

      const reports: Report[] = (res.data.users?.allReports || []).map(
        (r: any) => ({
          ...r,
          userName: r.user.name,
          userRole: r.user.role,
        })
      );

      setAllReports(reports);
      setUsers(res.data.users?.users || []);
      setCurrentPage(1);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") fetchData();
  }, [token, user]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const handleDeleteReport = async (reportId: number) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      await axios.delete(`${API_URL}/admin/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Report deleted successfully");
      setAllReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete report");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setAllReports((prev) => prev.filter((r) => r.userId !== userId));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    }
  };

  // Pagination
  const totalPages = Math.ceil(allReports.length / reportsPerPage);
  const paginatedReports = allReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Chart Data
  const reportsPerUser = useMemo(() => {
    const counts: { [key: string]: number } = {};
    users.forEach((u) => (counts[u.name] = u._count.reports));
    return counts;
  }, [users]);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // <-- forces integer ticks only
        },
      },
    },
  };

  const reportsOverTime = useMemo(() => {
    const counts: { [key: string]: number } = {};
    allReports.forEach((r) => {
      const date = new Date(r.date).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    return counts;
  }, [allReports]);

  const barData = {
    labels: Object.keys(reportsPerUser),
    datasets: [
      {
        label: "Reports per User",
        data: Object.values(reportsPerUser),
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // <-- ensures Y-axis only shows integers
        },
      },
    },
  };

  const lineData = {
    labels: Object.keys(reportsOverTime),
    datasets: [
      {
        label: "Reports Over Time",
        data: Object.values(reportsOverTime),
        fill: true,
        backgroundColor: "rgba(147, 197, 253, 0.4)",
        borderColor: "rgba(59, 130, 246, 1)",
        tension: 0.4,
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Access denied: Admins only</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-6">
      <ToasterAny position="top-right" />
      <MotionDiv
        className="mb-6 flex justify-end"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      </MotionDiv>

      <MotionDiv
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionDiv className="mb-6 text-center" variants={cardVariants}>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage users and reports</p>
        </MotionDiv>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MotionDiv
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Reports per User</h2>
            <Bar data={barData} options={barOptions} />
          </MotionDiv>
          <MotionDiv
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Reports Over Time</h2>
            <Line data={lineData} options={lineOptions} />
          </MotionDiv>
        </div>

        {/* Users */}
        <MotionDiv className="mb-8" variants={cardVariants}>
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {users
              .filter((u) => u.role !== "admin")
              .map((u) => (
                <MotionDiv
                  key={u.id}
                  variants={cardVariants}
                  className="bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.role}</p>
                    <p className="text-sm text-gray-400">
                      {u._count.reports} reports
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(u.id)}
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                  >
                    Delete User
                  </button>
                </MotionDiv>
              ))}
          </div>
        </MotionDiv>

        {/* Reports */}
        {loading ? (
          <div className="text-center text-gray-600 mt-20">
            Loading reports...
          </div>
        ) : paginatedReports.length === 0 ? (
          <MotionDiv
            variants={cardVariants}
            className="bg-white rounded-xl p-8 shadow-md text-center"
          >
            <p className="text-gray-700 text-lg">No reports found.</p>
          </MotionDiv>
        ) : (
          <MotionDiv variants={containerVariants}>
            <h2 className="text-2xl font-semibold mb-4">Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedReports.map((report) => (
                <MotionDiv
                  key={report.id}
                  variants={cardVariants}
                  className="bg-white border border-gray-100 rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
                >
                  <h2 className="text-lg font-semibold mb-2">
                    {report.userName} ({report.userRole})
                  </h2>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(report.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Tasks:</strong> {report.tasks}
                  </p>
                  <p>
                    <strong>Timings:</strong> {report.timings}
                  </p>
                  {report.notes && (
                    <p className="italic text-gray-600">{report.notes}</p>
                  )}
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="mt-4 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                  >
                    Delete Report
                  </button>
                </MotionDiv>
              ))}
            </div>
            {allReports.length > reportsPerPage && (
              <div className="col-span-2 flex justify-center mt-6 gap-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-4 py-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </MotionDiv>
        )}
      </MotionDiv>
    </div>
  );
}
