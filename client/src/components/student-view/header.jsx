import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import Chatbot from "./AiChat";
import { AiFillRobot } from "react-icons/ai";
import CodeEditor from "@/compiler/CodeEditor";
import { SiCompilerexplorer } from "react-icons/si";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import theme from "@/theme";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [showChatbot, setShowChatbot] = useState(false); // State for chatbot visibility
  const [showCompiler, setShowCompiler] = useState(false); // State for compiler visibility

  const toggleChatbot = () => setShowChatbot(!showChatbot);
  const toggleCompiler = () => setShowCompiler(!showCompiler);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative bg-white dark:bg-gray-800">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold md:text-xl text-[14px]">LMS LEARN</span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => !location.pathname.includes("/courses") && navigate("/courses")}
            className="text-[14px] md:text-[16px] font-medium"
          >
            Explore Courses
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* AI Chatbot Button */}
        <button
          onClick={toggleChatbot}
          className="w-12 btn btn-ghost btn-circle flex items-center justify-center"
        >
          <AiFillRobot />
          <span className="text-lg font-bold text-gray-600">AI</span>
        </button>
        {showChatbot && (
          <div className="fixed right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl w-80 top-16">
            <Chatbot />
          </div>
        )}

        {/* Compiler Button */}
        <button
          onClick={toggleCompiler}
          className="w-12 btn btn-ghost btn-circle flex items-center justify-center"
        >
          <SiCompilerexplorer />
          <span className="font-extrabold text-[14px]">Compiler</span>
        </button>
        {showCompiler && (
          <ChakraProvider theme={theme}>
            <Box
              className="fixed right-4 z-50 p-4 rounded-lg shadow-xl"
              bg="white" // Explicit background for the modal
              dark={{ bg: "gray.900" }}
              w="80vw"
              h="57vh"
              top="20"
              overflow="hidden"
            >
              <CodeEditor />
            </Box>
          </ChakraProvider>
        )}

        {/* Navigation and Logout */}
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="font-extrabold md:text-xl text-[14px]">My Courses</span>
            <TvMinimalPlay className="w-8 h-8" />
          </div>
          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
