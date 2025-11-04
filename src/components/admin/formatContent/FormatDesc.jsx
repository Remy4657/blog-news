"use client";

// @ts-nocheck
import ReactMarkdown from "react-markdown";
// @ts-nocheck
import remarkGfm from "remark-gfm";

const SinglePage = async ({ desc }) => {
  return (
    <>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{desc}</ReactMarkdown>
    </>
  );
};

export default SinglePage;
