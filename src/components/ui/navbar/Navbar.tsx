"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'


const Navbar = () => {
    const { data: session } = useSession()
    const user: User = session?.user as User

    return (
        <motion.nav 
            className="bg-gray-800 p-4 flex justify-between items-center shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Link href="/" className="text-white text-lg font-bold hover:text-gray-300 transition-colors">
                Mystry Message
            </Link>
            <div>
                {session ? (
                    <div className="flex items-center space-x-4">
                        
                        <span className="text-white">{user.username}</span>
                        <Button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link href="/signin">
                            <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                Login
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                                Register
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </motion.nav>
    )
}

export default Navbar
