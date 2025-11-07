import DetailPost from "@/components/componentClient/DetailPost";

const SinglePage = async ({ params }) => {
  const { slug } = await params;

  return (
    <>
      <DetailPost slug={slug} />
    </>
  );
};

export default SinglePage;
