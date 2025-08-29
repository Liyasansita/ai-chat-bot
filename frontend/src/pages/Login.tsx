// import React, { useEffect } from "react";
// import { IoIosLogIn } from "react-icons/io";
// import { Box, Typography, Button } from "@mui/material";
// import CustomizedInput from "../components/shared/CustomizedInput";
// import { toast } from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const auth = useAuth();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     try {
//       toast.loading("Signing In", { id: "login" });
//       await auth?.login(email, password);
//       toast.success("Signed In Successfully", { id: "login" });
//     } catch (error) {
//       toast.error("Signing In Failed", { id: "login" });
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.user) navigate("/chat");
//   }, [auth]);

//   return (
//     <Box
//       width="100%"
//       minHeight="100vh"
//       display="flex"
//       sx={{
//         background: "linear-gradient(135deg, #0d0d0d, #1a1a2e, #0d0d0d)",
//         color: "#fff",
//       }}
//     >
//       {/* Left Image for md+ */}
//       <Box
//         flex={{ md: 0.5 }}
//         display={{ md: "flex", xs: "none", sm: "none" }}
//         justifyContent="center"
//         alignItems="center"
//         sx={{ p: 4 }}
//       >
//         <img
//           src="airobot.png"
//           alt="Robot"
//           style={{ width: "350px", borderRadius: "10px", boxShadow: "0 8px 30px rgba(100,243,213,0.5)" }}
//         />
//       </Box>

//       {/* Login Form */}
//       <Box
//         flex={{ xs: 1, md: 0.5 }}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         sx={{ px: 2 }}
//       >
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             width: "100%",
//             maxWidth: "400px",
//             padding: "30px",
//             borderRadius: "15px",
//             background: "rgba(255,255,255,0.05)",
//             backdropFilter: "blur(12px)",
//             boxShadow: "0 8px 30px rgba(100,243,213,0.3)",
//             display: "flex",
//             flexDirection: "column",
//             gap: "20px",
//           }}
//         >
//           <Typography
//             variant="h4"
//             textAlign="center"
//             fontWeight={700}
//             sx={{
//               background: "linear-gradient(90deg, #64f3d5, #b266ff)",
//               WebkitBackgroundClip: "text",
//               color: "transparent",
//             }}
//           >
//             Lexi AI Login
//           </Typography>

//           <CustomizedInput type="email" name="email" label="Email" />
//           <CustomizedInput type="password" name="password" label="Password" />

//           <Button
//             type="submit"
//             endIcon={<IoIosLogIn />}
//             sx={{
//               px: 2,
//               py: 1.5,
//               borderRadius: 3,
//               bgcolor: "#64f3d5",
//               color: "#000",
//               fontWeight: 700,
//               fontSize: "1rem",
//               transition: "0.3s",
//               ":hover": {
//                 bgcolor: "#b266ff",
//                 color: "#fff",
//               },
//             }}
//           >
//             Login
//           </Button>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default Login;
import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      toast.error("Signing In Failed", { id: "login" });
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.user) navigate("/chat");
  }, [auth]);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      sx={{
        background: "linear-gradient(135deg, #000000, #1a1a1a, #000000)", // Homepage style
        color: "#f5f5dc", // beige text
      }}
    >
      {/* Left Image for md+ */}
      <Box
        flex={{ md: 0.5 }}
        display={{ md: "flex", xs: "none", sm: "none" }}
        justifyContent="center"
        alignItems="center"
        sx={{ p: 4 }}
      >
        <img
          src="airobot.png"
          alt="Robot"
          style={{
            width: "320px",
            borderRadius: "10px",
            boxShadow: "0 8px 30px rgba(245,245,220,0.4)", // beige glow
          }}
        />
      </Box>

      {/* Login Form */}
      <Box
        flex={{ xs: 1, md: 0.5 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ px: 2 }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "30px",
            borderRadius: "15px",
            background: "rgba(255,255,255,0.05)", // translucent beige effect
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 30px rgba(245,245,220,0.3)", // soft beige glow
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            sx={{
              color: "#f5f5dc", // beige heading
            }}
          >
            Lexi AI Login
          </Typography>

          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />

          <Button
            type="submit"
            endIcon={<IoIosLogIn />}
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#f5f5dc", // beige button
              color: "#000",
              fontWeight: 700,
              fontSize: "1rem",
              transition: "0.3s",
              ":hover": {
                bgcolor: "#333", // black hover
                color: "#f5f5dc", // beige text on hover
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;


