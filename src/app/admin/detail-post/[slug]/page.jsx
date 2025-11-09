import React from "react";
import DetaiPost from "@/components/admin/componentClient/DetailPost";

const SinglePage = async ({ params }) => {
  const { slug } = await params;

  return (
    <>
      <DetaiPost slug={slug} />
    </>
  );
};

export default SinglePage;
