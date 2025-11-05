'use client'
import { useState, FormEvent, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../AuthContext'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

// Define motion components with proper types
const MotionDiv:any = motion.div
const MotionForm:any = motion.form
const MotionInput:any = motion.input
const MotionButton:any = motion.button
const MotionSpan:any = motion.span
const MotionH2:any = motion.h2
const MotionP:any = motion.p
const MotionA:any = motion.a

export default function Login() {
    const { user, token } = useAuth();

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true)

  const { login } = useAuth()
  const router = useRouter()
 const handleSubmit = async (e: FormEvent): Promise<void> => {
  e.preventDefault()
  setLoading(true)

  if (!email || !password) {
    toast.error('Please fill in all fields')
    setLoading(false)
    return
  }

  try {
    const userData = await login(email, password) // login returns user & token
    toast.success('Welcome back! Redirecting...')
  
  } catch (error: any) {
    toast.error(error.message || 'Login failed')
  } finally {
    setLoading(false)
  }
}

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  }
  useEffect(() => {
    if (token && user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/dashboard')
      } else {
        router.push('/reports')
      }
    } else {
    }
  }, [token, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center py-12 px-4">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <MotionDiv
        className="max-w-md w-full space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionDiv variants={itemVariants} className="text-center">
          <MotionDiv
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl text-white">📊</span>
          </MotionDiv>
          
          <MotionH2 
            className="mt-6 text-center text-4xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome Back
          </MotionH2>
          
          <MotionP 
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Sign in to your Daily Reports account
          </MotionP>
        </MotionDiv>

        <MotionForm 
          className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          variants={containerVariants}
          onSubmit={handleSubmit}
        >
          <MotionDiv variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <MotionInput
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="relative block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
              whileFocus={{ 
                scale: 1.02,
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
              }}
            />
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <MotionInput
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="relative block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
              whileFocus={{ 
                scale: 1.02,
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <MotionSpan
                animate={loading ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                transition={{ duration: 1.5, repeat: loading ? Infinity : 0 }}
                className="flex items-center"
              >
                {loading ? (
                  <>
                    <motion.svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </motion.svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in to your account'
                )}
              </MotionSpan>
            </MotionButton>
          </MotionDiv>

          <MotionDiv 
            className="text-center"
            variants={itemVariants}
          >
            <MotionP 
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Don't have an account?{' '}
              <MotionA
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up here
              </MotionA>
            </MotionP>
          </MotionDiv>
        </MotionForm>
      </MotionDiv>
    </div>
  )
}