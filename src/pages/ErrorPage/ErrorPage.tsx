import { Link } from "react-router-dom";
import { HeaderNav } from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

export default function ErrorPage() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <HeaderNav />
        
        <main className="container px-4 pt-32 my-0 mx-auto text-center">
          <h1 className="pb-8">( ·.· ) This page does not exist! ( ·.· )</h1>
          <Link to="/" className="hover:text-gray-400 transition-colors duration-300 text-white uppercase">Return to home →</Link>
        </main>
        <Footer />
      </div>
    </>
  );
}