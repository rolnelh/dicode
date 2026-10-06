'use client';
import {useEffect,useRef,useState} from 'react';
import {useLanguage} from '@/components/language-provider';
function PreviewScreen({mobile=false}:{mobile?:boolean}) {
 const ref=useRef<HTMLDivElement>(null);const [width,setWidth]=useState(0);
 const viewport=mobile?{width:390,height:900}:{width:1280,height:840};
 useEffect(()=>{const element=ref.current;if(!element)return;const measure=()=>setWidth(element.getBoundingClientRect().width);measure();if(typeof ResizeObserver==='undefined'){window.addEventListener('resize',measure);return()=>window.removeEventListener('resize',measure);}const observer=new ResizeObserver(measure);observer.observe(element);return()=>observer.disconnect();},[]);
 return <div ref={ref} className="portfolio-preview-screen" style={{aspectRatio:`${viewport.width}/${viewport.height}`}} inert>
  {width>0&&<iframe src="/apercu-portfolio/" title={mobile?'Dicode — aperçu mobile':'Dicode — aperçu ordinateur'} loading="lazy" tabIndex={-1} aria-hidden="true" width={viewport.width} height={viewport.height} style={{transform:`scale(${width/viewport.width})`}}/>}
 </div>;
}
export function PortfolioMockup(){const {language}=useLanguage();return <div className="project-art portfolio-device-scene" role="img" aria-label={language==='fr'?'Le portfolio Dicode présenté sur ordinateur et téléphone':'The Dicode portfolio shown on desktop and mobile'}><span className="portfolio-device-orbit" aria-hidden="true"/><div className="portfolio-desktop-device" aria-hidden="true"><div className="portfolio-desktop-bezel"><span className="desktop-camera"/><PreviewScreen/></div><div className="portfolio-monitor-chin"/><div className="portfolio-monitor-stand"/></div><div className="portfolio-phone-device" aria-hidden="true"><span className="portfolio-phone-notch"/><PreviewScreen mobile/></div><span className="portfolio-device-caption" aria-hidden="true">DICODE / DESKTOP + MOBILE</span></div>;}
