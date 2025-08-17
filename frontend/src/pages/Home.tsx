import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      width="100%"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #0d0d0d, #111827, #0d0d0d)",
        color: "#fff",
        py: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          px: 2,
        }}
      >
        {/* Typing Animation */}
        <Box sx={{ mb: 6 }}>
          <TypingAnim />
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            alignItems: "center",
            justifyContent: "center",
            mb: 8,
          }}
        >
          <Box
            sx={{
              background: "rgba(0,255,200,0.05)",
              p: 3,
              borderRadius: 3,
              boxShadow: "0 8px 25px rgba(0,255,200,0.4)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0 12px 35px rgba(0,255,200,0.6)" },
            }}
          >
            <img
              src="robot.png"
              alt="robot"
              style={{ width: "200px", display: "block", margin: "auto" }}
            />
          </Box>
          <Box
            sx={{
              background: "rgba(178,102,255,0.05)",
              p: 3,
              borderRadius: 3,
              boxShadow: "0 8px 25px rgba(178,102,255,0.4)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0 12px 35px rgba(178,102,255,0.6)" },
            }}
          >
            <img
              className="image-inverted rotate"
              src="openai.png"
              alt="openai"
              style={{ width: "200px", display: "block", margin: "auto" }}
            />
          </Box>
        </Box>

        {/* Chat Image */}
        <Box
          sx={{
            background: "rgba(0,255,200,0.05)",
            borderRadius: 3,
            boxShadow: "0 12px 45px rgba(0,255,200,0.3)",
            p: 2,
            maxWidth: isBelowMd ? "90%" : "70%",
            mx: "auto",
            mb: 5,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": { transform: "scale(1.02)", boxShadow: "0 16px 55px rgba(0,255,200,0.5)" },
          }}
        >
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              width: "100%",
              borderRadius: 20,
            }}
          />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;

