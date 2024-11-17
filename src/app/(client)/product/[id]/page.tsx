import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Page;
