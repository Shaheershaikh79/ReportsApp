"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Report {
  id: string;
  date: string;
  tasks: string;
  timings: string;
  notes?: string;
  userId: string;
  createdAt: string;
}

const MotionDiv: any = motion.div;

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reportToEdit, setReportToEdit] = useState<Report | null>(null);
  const [editForm, setEditForm] = useState({
    date: "",
    tasks: "",
    timings: "",
    notes: "",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const reportsPerPage = 4;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { user, token, logout } = useAuth();
  const router = useRouter();

  // Role-based access control
  useEffect(() => {
    if (!user) return;
    if (user.role !== "user") {
      toast.error("Access denied: Only users can access reports");
      router.push(user.role === "admin" ? "/dashboard" : "/login");
    }
  }, [user]);

  useEffect(() => {
    if (user && token && user.role === "user") fetchReports();
  }, [user, token]);

  const fetchReports = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch reports");
      }
      const data = await res.json();
      setReports(data || []);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (report: Report) => {
    setReportToDelete(report);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!reportToDelete || !token) return;
    setDeleteLoading(reportToDelete.id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/${reportToDelete.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete report");
      }
      toast.success("Report deleted successfully");
      setReports(reports.filter((r) => r.id !== reportToDelete.id));
      setShowDeleteModal(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEditClick = (report: Report) => {
    setReportToEdit(report);
    setEditForm({
      date: report.date,
      tasks: report.tasks,
      timings: report.timings,
      notes: report.notes || "",
    });
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    if (!reportToEdit || !token) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports/${reportToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update report");
      }
      toast.success("Report updated successfully");
      setReports(
        reports.map((r) =>
          r.id === reportToEdit.id ? { ...r, ...editForm } : r
        )
      );
      setShowEditModal(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleLogoutConfirm = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Pagination
  const totalPages = Math.ceil(reports.length / reportsPerPage);
  const paginatedReports = reports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );
  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="flex justify-end px-5 mb-4">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      </div>

      <Toaster position="top-right" />

      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
            <p className="text-gray-600 mt-2">Manage your daily work reports</p>
          </div>
          <button
            onClick={() => router.push("/reports/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            + New Report
          </button>
        </MotionDiv>

        {reports.length === 0 ? (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No reports yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first daily report to get started
            </p>
            <button
              onClick={() => router.push("/reports/new")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Create Your First Report
            </button>
          </MotionDiv>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedReports.map((report, index) => (
                <MotionDiv
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {new Date(report.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        <strong>Timings:</strong> {report.timings}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(report)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(report)}
                        disabled={deleteLoading === report.id}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                      >
                        {deleteLoading === report.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Tasks Completed:
                    </h4>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {report.tasks}
                    </p>
                  </div>
                  {report.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Additional Notes:
                      </h4>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {report.notes}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Created: {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && reportToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Delete Report?</h2>
            <p className="mb-6">Are you sure you want to delete this report?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && reportToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Report</h2>
            <div className="flex flex-col gap-3">
              <input
                type="date"
                value={editForm.date}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
                className="border px-3 py-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Tasks"
                value={editForm.tasks}
                onChange={(e) =>
                  setEditForm({ ...editForm, tasks: e.target.value })
                }
                className="border px-3 py-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Timings"
                value={editForm.timings}
                onChange={(e) =>
                  setEditForm({ ...editForm, timings: e.target.value })
                }
                className="border px-3 py-2 rounded-lg"
              />
              <textarea
                placeholder="Notes"
                value={editForm.notes}
                onChange={(e) =>
                  setEditForm({ ...editForm, notes: e.target.value })
                }
                className="border px-3 py-2 rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-full w-80 h-80 flex flex-col items-center justify-center p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-center">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Do you want to logout?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
