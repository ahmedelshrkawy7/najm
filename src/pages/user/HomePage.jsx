import { useEffect, useRef } from "react";
import { About, Header } from "../../import";
import Footer from "../../includes/footer/Footer";

const HomePage = () => {
  const ref = useRef();
  useEffect(() => {
    ref?.current?.scrollIntoView();
  }, []);
  return (
    <div>
      <Header ref={ref} />
      <About />
      <Footer />
    </div>
  );
};

export default HomePage;
