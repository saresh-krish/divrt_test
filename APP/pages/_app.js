import Head from 'next/head'

import Footer from "../components/footer";
import styles from '../styles/Home.module.css' 
import { Layout } from "antd"; 
const { Content } = Layout;
import "antd/dist/antd.css";
import "../styles/globals.css";

function App({ Component, pageProps }) {

   return ( 
      <Layout className="container"> 
         <Head>
            <title>divrt.co</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
         </Head>         
         <Content className={`container`}>
            <div className="main_container" >
               <Component {...pageProps} />
            </div> 
         </Content>
         <Footer></Footer>
      </Layout>          
    );
 
}

export default App
