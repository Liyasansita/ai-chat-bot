import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value?.trim();
    if (!content) {
      toast.error("Message cannot be empty");
      return;
    }
    if (inputRef.current) inputRef.current.value = "";
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const chatData = await sendChatRequest(content);
      if (chatData?.chats) setChatMessages([...chatData.chats]);
      else toast.error("Unexpected response from server.");
    } catch (error: any) {
      if (error.response) toast.error(error.response.data?.message || "Failed to send message.");
      else if (error.request) toast.error("No response from server.");
      else toast.error("Unexpected error occurred.");
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch(() => toast.error("Loading Failed", { id: "loadchats" }));
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) navigate("/login");
  }, [auth]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", minHeight: "100vh", mt: 3, gap: 3, px: 2 }}>
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          flex: 0.25,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            borderRadius: 3,
            boxShadow: "0 8px 25px rgba(100, 243, 213, 0.3)",
            px: 3,
            py: 4,
            height: "70vh",
            mx: "auto",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              mb: 2,
              bgcolor: "#64f3d5",
              color: "#000",
              fontWeight: 700,
            }}
          >
            {(() => {
              const name = auth?.user?.name || "";
              const parts = name.trim().split(" ");
              return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
            })()}
          </Avatar>
          <Typography sx={{ textAlign: "center", fontWeight: 600, mb: 2 }}>
            You are talking to Lexi AI
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: "0.9rem", color: "#ccc", mb: 4 }}>
            Ask questions related to Knowledge, Business, Advice, Education, etc. Avoid sharing personal info.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "180px",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[400],
              ":hover": { bgcolor: red.A400 },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* Chat Area */}
      <Box sx={{ display: "flex", flex: { md: 0.75, xs: 1 }, flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            fontWeight: 600,
            textAlign: "center",
            mb: 2,
            background: "linear-gradient(90deg,#64f3d5,#b266ff)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>

        <Box
          sx={{
            flex: 1,
            height: "65vh",
            borderRadius: 3,
            overflowY: "auto",
            px: 2,
            py: 1,
            mb: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 30px rgba(100, 243, 213, 0.2)",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
          <div ref={bottomRef} />
        </Box>

        {/* Input Box */}
        <Box
          sx={{
            display: "flex",
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            px: 2,
            py: 1,
            boxShadow: "0 4px 20px rgba(100,243,213,0.3)",
            alignItems: "center",
            gap: 1,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            style={{
              flex: 1,
              backgroundColor: "transparent",
              padding: "15px",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "1rem",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "#64f3d5" }}>
            <IoMdSend fontSize={24} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;


