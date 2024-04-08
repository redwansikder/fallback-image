import Image from "next/image";
import { ClientImageWithFallback } from "./ClientImageWithFallback";
import { ServerImageWithFallback } from "./ServerImageWithFallback";


export default function Home() {

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <ul>
        {[1,2,3,4,5,100,500,"https://tibet.net/wp-content/uploadszzz/2020/11/potala-TransBG-2.png"].map((n,index)=>{
          let src;
          if (typeof n === 'string') {
            src = n;
          }else{
            src = `/${n}.png`;
          }
          return(<li key={index}>
          {/* <Image alt="" src={`/${n+1}.png`} width={150} height={150} style={{height:"150px",width:"150px"}}/> */}
          <ClientImageWithFallback
           alt="" 
           src={src} 
           width={150} 
           fallbackSrc={`/f.png`} 
           height={150}
           style={{height:"150px",width:"150px"}}
           />
          {/* <ServerImageWithFallback
           alt="" 
           src={src} 
           width={150} 
           fallbackSrc={`/f.png`} 
           height={150}
           style={{height:"150px",width:"150px"}}
           /> */}
        </li>)})}
      </ul>
      <p>test..............</p>

    </main>
  );
}
