import CozeChat from "./components/Chatbox";
import Header from "./components/Header";

import ProductSeller from "./components/ProductSeller";
import Video from "./components/Video";

const Page = () => {
  return (
    <>
      <Header />
      <Video />
      <div className="ml-5">
        <ProductSeller />
      </div>

      <CozeChat />
    </>
  );
};

export default Page;
