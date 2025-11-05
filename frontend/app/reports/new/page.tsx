"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../AuthContext";
const MotionDiv:any = motion.div as typeof motion.div

// Option 2: Import as any (if you're still having type issues)
const ToasterAny = Toaster as any;
export default function NewReportPage() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState("");
  const [timings, setTimings] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-700">Checking authentication...</div>
      </div>
    );
  }

  if (!user || !token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-600 mb-4">
          You must be logged in to create a report.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !tasks || !timings) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date,
          tasks,
          timings,
          notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create report");
      }

      toast.success("Report created successfully!");
      setTimeout(() => router.push("/reports"), 1500);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ToasterAny
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
        }}
      />

      <div className="container mx-auto px-4 max-w-2xl">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Create New Report
          </h1>
          <p className="text-gray-600 mb-6">
            Fill out the details of your daily work report.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Tasks Completed <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Describe the tasks you completed today..."
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Timings <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 9:00 AM - 5:00 PM"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Additional Notes
              </label>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Any comments or notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/reports")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
              >
                {submitting ? "Creating..." : "Create Report"}
              </button>
            </div>
          </form>
        </MotionDiv>
      </div>
    </div>
  );
}
