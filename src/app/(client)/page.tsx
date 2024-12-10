import CozeChat from "./components/Chatbox";
import Header from "./components/Header";

import ProductSeller from "./components/ProductSeller";
import Video from "./components/Video";

const Page = () => {
  return (
    <>
      <Header />
      <Video />
      <ProductSeller />
      <CozeChat />
    </>
  );
};

export default Page;
