"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const MotionDiv: any = motion.div;

export default function GetStartedPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    toast.success("Redirecting to login...");
    router.push("/login");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-6">
      <Toaster position="top-right" />
      <MotionDiv
        className="max-w-3xl text-center bg-white p-10 rounded-2xl shadow-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionDiv variants={cardVariants} className="mb-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Your Reports App
          </h1>
          <p className="text-gray-600 text-lg">
            Track reports, manage users, and gain insights with ease.
          </p>
        </MotionDiv>

        <MotionDiv variants={cardVariants} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="font-semibold text-lg mb-2">Reports</h2>
              <p className="text-gray-600 text-sm">
                View detailed reports for all users in one place.
              </p>
            </div>
            <div className="bg-indigo-100 p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="font-semibold text-lg mb-2">Users</h2>
              <p className="text-gray-600 text-sm">
                Manage your users and their activities efficiently.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all">
              <h2 className="font-semibold text-lg mb-2">Insights</h2>
              <p className="text-gray-600 text-sm">
                Visualize data trends and get actionable insights.
              </p>
            </div>
          </div>
        </MotionDiv>

        <MotionDiv variants={cardVariants}>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-lg"
          >
            Get Started
          </button>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}
