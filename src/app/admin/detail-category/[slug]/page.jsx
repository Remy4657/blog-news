import React from "react";
import DetaiCategory from "@/components/admin/componentClient/DetailCategory";

const SinglePage = async ({ params }) => {
  const { slug } = await params;

  return (
    <>
      <DetaiCategory slug={slug} />
    </>
  );
};

export default SinglePage;
