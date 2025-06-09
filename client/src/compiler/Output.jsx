import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error("Execution Error:", error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%" className="bg-orange-300">
      <Text mb={2} fontSize="lg" fontWeight="bold">
        Output
      </Text>
      <Button
        size="sm"
        variant="solid"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        loadingText="Running..."
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="40vh" 
        overflowY="auto" 
        p={3}
        bg="gray.800" 
        color={isError ? "red.400" : "white"}
        borderRadius={4}
        border="1px solid"
        borderColor={isError ? "red.500" : "gray.700"}
        fontSize="sm" /* Smaller font size for compact display */
      >
        {output ? (
          output.map((line, i) => (
            <Text key={i} whiteSpace="pre-wrap">
              {line}
            </Text>
          ))
        ) : (
          <Text>Click "Run Code" to see the output here</Text>
        )}
      </Box>
    </Box>
  );
};

export default Output;
