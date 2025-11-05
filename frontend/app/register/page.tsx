"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, Variants } from "framer-motion";

import { useAuth } from "../AuthContext";
const MotionForm: any = motion.form as typeof motion.form;
const MotionSpan: any = motion.span as typeof motion.span;
const MotionDiv: any = motion.div as typeof motion.div;
const MotionButton: any = motion.button as typeof motion.button;
const MotionInput: any = motion.input as typeof motion.input;
const MotionH2: any = motion.h2 as typeof motion.h2;
const MotionP: any = motion.p as typeof motion.p;
const MotionA: any = motion.a as typeof motion.a;
const MotionSelect: any = motion.select as typeof motion.select;

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("user"); // default to 'user'

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await register(name, email, password, role); // add role here
      toast.success("Account created successfully!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      toast.error(error?.message || "Registration failed");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center py-12 px-4 relative">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
          success: {
            duration: 3000,
            iconTheme: { primary: "#10B981", secondary: "#fff" },
          },
          error: {
            duration: 4000,
            iconTheme: { primary: "#EF4444", secondary: "#fff" },
          },
        }}
      />

      <MotionDiv
        className="max-w-md w-full space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <MotionDiv variants={itemVariants} className="text-center">
          <MotionDiv
            className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl text-white">📝</span>
          </MotionDiv>

          <MotionH2
            className="mt-6 text-center text-4xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create an Account
          </MotionH2>

          <MotionP
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join the Daily Reports system today!
          </MotionP>
        </MotionDiv>

        {/* Form */}
        <MotionForm
          className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          variants={containerVariants}
          onSubmit={handleSubmit}
        >
          <MotionDiv variants={itemVariants}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <MotionInput
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              className="relative block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)",
              }}
            />
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <MotionInput
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              className="relative block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)",
              }}
            />
          </MotionDiv>
          <MotionDiv variants={itemVariants}>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <MotionSelect
              id="role"
              name="role"
              value={role}
              onChange={(e: any) => setRole(e.target.value)}
              className="relative block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </MotionSelect>
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <MotionInput
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              className="relative block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter a strong password"
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)",
              }}
            />
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <MotionButton
              type="submit"
              disabled={loading}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <MotionSpan
                animate={loading ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                transition={{ duration: 1.5, repeat: loading ? Infinity : 0 }}
                className="flex items-center"
              >
                {loading ? "Creating account..." : "Sign up"}
              </MotionSpan>
            </MotionButton>
          </MotionDiv>

          <MotionDiv className="text-center" variants={itemVariants}>
            <MotionP
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Already have an account?{" "}
              <MotionA
                href="/login"
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign in here
              </MotionA>
            </MotionP>
          </MotionDiv>
        </MotionForm>
      </MotionDiv>
    </div>
  );
}
