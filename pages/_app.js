import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import {CrowdFundingProvider} from  "../Context/crowdfunding"
export default function App({ Component, pageProps }) {
  return(
    <>
    <CrowdFundingProvider >
    <Navbar />
    <Component {...pageProps} />
    <Footer />
    </CrowdFundingProvider>
    </>
  ) ;
}
