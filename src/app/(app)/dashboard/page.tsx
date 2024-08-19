"use client"
import { useCallback, useState, useEffect } from 'react'
import { Message } from '@/model/userModel'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { acceptMessageSchema } from '@/schemas/acceptMessage'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import * as z from 'zod'
import { ApiResponse } from '@/types/ApiResponse'
import { Switch } from "@/components/ui/switch"
import { Loader2 } from 'lucide-react'
import { MessageCard } from '@/components/ui/messagecard/MessageCard'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RefreshCcw } from 'lucide-react'

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')

  const { toast } = useToast()
  const { data: session } = useSession()

  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver: zodResolver(acceptMessageSchema),
  })
  const { register, watch, setValue } = form

  const acceptMessages = watch("acceptMessages")

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages || false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to fetch message settings',
        variant: 'destructive',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>("/api/get-messages")
      setMessages(response.data.messages || [])
      console.log(response.data.messages)
      if (refresh) {
        toast({
          title: "Refreshed",
          description: "Messages refreshed successfully",
          variant: "default",
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Refreshed Failed to fetch messages",
        variant: "destructive",
      })
    } finally {
      setIsSwitchLoading(false)
      setIsLoading(false)
    }
  }, [toast])

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(message => message._id !== messageId))
  }

  useEffect(() => {
    if (!session || !session.user) {
      return
    }
    fetchMessages()
    fetchAcceptMessage()
    const baseUrl = `${window.location.protocol}//${window.location.host}`
    const profileUrl = `${baseUrl}/sendmessage/${session.user.username}`
    setProfileUrl(profileUrl)
  }, [fetchMessages, fetchAcceptMessage, session])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to update message settings',
        variant: 'destructive',
      });
    }
  };

  if (!session || !session.user) {
    return null
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
      title: "Copied",
      description: "Profile URL copied to clipboard",
      variant: "default",
    })
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded-lg shadow-lg w-full max-w-6xl">
      <motion.h1 
        className="text-4xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome Back, {session.user.username}!
      </motion.h1>

      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-3/4 p-1 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </motion.div>

      <motion.div 
        className="mb-4 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </motion.div>
      <Separator />

      <motion.div 
        className="mt-4 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
      </motion.div>

      <motion.div 
        className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MessageCard
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            </motion.div>
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard
