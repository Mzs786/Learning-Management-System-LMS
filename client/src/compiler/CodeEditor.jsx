import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box
      bg="gray.800" // Explicit background color for the editor container
      color="white"
      p={4}
      borderRadius="md"
      shadow="lg"
    >
      <HStack spacing={4} alignItems="stretch">
        {/* Editor Section */}
        <Box w="50%" bg="gray.900" p={2} borderRadius="md">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark" // Ensure dark theme for Monaco Editor
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>

        {/* Output Section */}
        <Box w="50%" bg="gray.900" p={2} borderRadius="md">
          <Output editorRef={editorRef} language={language} />
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
