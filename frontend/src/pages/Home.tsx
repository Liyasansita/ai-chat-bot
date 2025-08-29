import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  
  const isBelowSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      width="100%"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #000000, #1a1a1a, #000000)",
        color: "#f5f5dc",
        py: { xs: 2, sm: 3, md: 5 },
        px: { xs: 0.5, sm: 1, md: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          px: { xs: 1, sm: 1.5, md: 4 },
        }}
      >
        {/* Typing Animation */}
        <Box
          sx={{
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
            width: "100%",
            maxWidth: "95%",
          }}
        >
          <TypingAnim />
        </Box>

        {/* Section Title */}
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 2, sm: 3, md: 4 },
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
            fontWeight: 600,
            textAlign: "center",
            px: 1,
          }}
        >
          Meet Your AI Assistant
        </Typography>

        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, sm: 2.5, md: 4 },
            alignItems: "center",
            justifyContent: "center",
            mb: { xs: 3, sm: 4, md: 6 },
            width: "100%",
            maxWidth: "95%",
          }}
        >
          {/* Robot Image */}
       {/* Robot / Homepage Image */}
<Box
  sx={{
    background: "rgba(245,245,220,0.05)",
    p: { xs: 1.5, sm: 2, md: 3 },       // same padding
    borderRadius: 2,
    boxShadow: "0 6px 20px rgba(245,245,220,0.25)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: isBelowSm ? "none" : "scale(1.05)",
      boxShadow: "0 10px 30px rgba(245,245,220,0.5)",
    },
    maxWidth: { xs: "60%", sm: "180px", md: "220px" }, // same as logo
    width: "100%",
  }}
>
  <img
    src="homepageimage.png"
    alt="robot"
    style={{
      width: "100%",
      height: "auto",
      display: "block",
      margin: "auto",
    }}
  />
</Box>

          {/* Lexi AI Logo */}
          <Box
            sx={{
              background: "rgba(245,245,220,0.05)",
              p: { xs: 1.5, sm: 2, md: 3 },
              borderRadius: 2,
              boxShadow: "0 6px 20px rgba(245,245,220,0.25)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: isBelowSm ? "none" : "scale(1.05)",
                boxShadow: "0 10px 30px rgba(245,245,220,0.5)",
              },
              maxWidth: { xs: "60%", sm: "180px", md: "220px" },
              width: "100%",
            }}
          >
            <img
              className="image-inverted"
              src="Lexi AI Logo Design.png"
              alt="openai"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                margin: "auto",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;


// Chat.tsx
// import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { Box, Avatar, Typography, Button, IconButton, Divider } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
// import ChatItem from "../components/chat/ChatItem";
// import { IoMdSend } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
// import toast from "react-hot-toast";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// const Chat = () => {
//   const navigate = useNavigate();
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const bottomRef = useRef<HTMLDivElement | null>(null);
//   const auth = useAuth();
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);

//   const handleSubmit = async () => {
//     const content = inputRef.current?.value?.trim();
//     if (!content) {
//       toast.error("Message cannot be empty");
//       return;
//     }
//     if (inputRef.current) inputRef.current.value = "";
//     const newMessage: Message = { role: "user", content };
//     setChatMessages((prev) => [...prev, newMessage]);

//     try {
//       const chatData = await sendChatRequest(content);
//       if (chatData?.chats) setChatMessages([...chatData.chats]);
//       else toast.error("Unexpected response from server.");
//     } catch (error: any) {
//       if (error.response) toast.error(error.response.data?.message || "Failed to send message.");
//       else if (error.request) toast.error("No response from server.");
//       else toast.error("Unexpected error occurred.");
//     }
//   };

//   const handleDeleteChats = async () => {
//     try {
//       toast.loading("Deleting Chats", { id: "deletechats" });
//       await deleteUserChats();
//       setChatMessages([]);
//       toast.success("Deleted Chats Successfully", { id: "deletechats" });
//     } catch (error) {
//       toast.error("Deleting chats failed", { id: "deletechats" });
//     }
//   };

//   useLayoutEffect(() => {
//     if (auth?.isLoggedIn && auth.user) {
//       toast.loading("Loading Chats", { id: "loadchats" });
//       getUserChats()
//         .then((data) => {
//           setChatMessages([...data.chats]);
//           toast.success("Successfully loaded chats", { id: "loadchats" });
//         })
//         .catch(() => toast.error("Loading Failed", { id: "loadchats" }));
//     }
//   }, [auth]);

//   useEffect(() => {
//     if (!auth?.user) navigate("/login");
//   }, [auth]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flex: 1,
//         width: "100%",
//         minHeight: "100vh",
//         mt: 3,
//         gap: 3,
//         px: 2,
//         bgcolor: "#0d0d0d", // Slightly softer black
//       }}
//     >
//       {/* Sidebar */}
//       <Box
//         sx={{
//           display: { md: "flex", xs: "none" },
//           flex: 0.25,
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             bgcolor: "#f5f5dc", // Beige
//             borderRadius: 4,
//             boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
//             px: 3,
//             py: 4,
//             height: "70vh",
//             mx: "auto",
//           }}
//         >
//           <Avatar
//             sx={{
//               mx: "auto",
//               mb: 2,
//               bgcolor: "#000000",
//               color: "#f5f5dc",
//               fontWeight: 700,
//               width: 56,
//               height: 56,
//               fontSize: "1.2rem",
//             }}
//           >
//             {(() => {
//               const name = auth?.user?.name || "";
//               const parts = name.trim().split(" ");
//               return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
//             })()}
//           </Avatar>
//           <Typography sx={{ textAlign: "center", fontWeight: 600, mb: 1, color: "#000" }}>
//             You are talking to
//           </Typography>
//           <Typography sx={{ textAlign: "center", fontWeight: 700, mb: 2, fontSize: "1.1rem", color: "#000" }}>
//             Lexi AI
//           </Typography>
//           <Divider sx={{ width: "100%", mb: 3, bgcolor: "#ccc" }} />
//           <Typography sx={{ textAlign: "center", fontSize: "0.85rem", color: "#333", mb: 4 }}>
//             Ask about Knowledge, Business, Advice, Education, etc.  
//             Avoid sharing personal info.
//           </Typography>
//           <Button
//             onClick={handleDeleteChats}
//             sx={{
//               width: "180px",
//               color: "#000",
//               fontWeight: 700,
//               borderRadius: 3,
//               textTransform: "none",
//               bgcolor: "#f5f5dc",
//               border: "1px solid #000",
//               ":hover": { bgcolor: "#e6e6c9" },
//             }}
//           >
//             Clear Conversation
//           </Button>
//         </Box>
//       </Box>

//       {/* Chat Area */}
//       <Box sx={{ display: "flex", flex: { md: 0.75, xs: 1 }, flexDirection: "column" }}>
//         <Typography
//           sx={{
//             fontSize: { xs: "1.6rem", md: "2.3rem" },
//             fontWeight: 700,
//             textAlign: "center",
//             mb: 3,
//             color: "#f5f5dc", // Beige text
//             letterSpacing: 1,
//           }}
//         >
//           Model - Gemini
//         </Typography>

//         {/* Chat Window */}
//         <Box
//           sx={{
//             flex: 1,
//             height: "65vh",
//             borderRadius: 3,
//             overflowY: "auto",
//             px: 2,
//             py: 2,
//             mb: 2,
//             bgcolor: "#111", // Softer black for messages area
//             boxShadow: "inset 0 0 10px rgba(245,245,220,0.1)",
//           }}
//         >
//           {chatMessages.map((chat, index) => (
//             <ChatItem content={chat.content} role={chat.role} key={index} />
//           ))}
//           <div ref={bottomRef} />
//         </Box>

//         {/* Input Box */}
//         <Box
//           sx={{
//             display: "flex",
//             borderRadius: 3,
//             bgcolor: "#f5f5dc", // Beige input area
//             px: 2,
//             py: 1,
//             alignItems: "center",
//             gap: 1.5,
//             border: "1px solid #000",
//           }}
//         >
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Type your message..."
//             style={{
//               flex: 1,
//               backgroundColor: "transparent",
//               padding: "12px",
//               border: "none",
//               outline: "none",
//               color: "#000000",
//               fontSize: "1rem",
//               fontFamily: "inherit",
//             }}
//           />
//           <IconButton
//             onClick={handleSubmit}
//             sx={{
//               color: "#f5f5dc",
//               bgcolor: "#000000",
//               p: 1.5,
//               borderRadius: 2,
//               "&:hover": { bgcolor: "#222" },
//             }}
//           >
//             <IoMdSend fontSize={22} />
//           </IconButton>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Chat;
