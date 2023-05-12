import Footer from "./components/Footer";
import Section1 from "./components/Home-sections/section-1";
import Section2 from "./components/Home-sections/section-2";
import Section3 from "./components/Home-sections/section-3";
import Section4 from "./components/Home-sections/section-4";
import Section5 from "./components/Home-sections/section-5";
import UpBtn from "./components/ScrollBtn";

export default function Home() {
  return (
    <>
      <main className="flex flex-col">
        <Section1 /> 
        <Section2 />  
        <Section3 />  
        <Section4 />
        <Section5 />
      </main>
      <footer>
       <Footer />
      </footer>
      <UpBtn /> 
    </>
  );
}
