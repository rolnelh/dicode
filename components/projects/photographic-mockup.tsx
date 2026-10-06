'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {projectScreen,type Quad} from '@/lib/mockup-projection';
import type {Capture} from './dashboard-mockup';
export type LaptopPlate={src:string;width:number;height:number;screen:Quad};
/** A generated environment with the unmodified project capture mapped onto its display. */
export function PhotographicMockup({project,plate}:{project:Capture;plate:LaptopPlate}) {
 const root=useRef<HTMLDivElement>(null);const [width,setWidth]=useState(0);
 useEffect(()=>{const element=root.current;if(!element)return;const measure=()=>setWidth(element.getBoundingClientRect().width);measure();if(typeof ResizeObserver==='undefined'){window.addEventListener('resize',measure);return()=>window.removeEventListener('resize',measure);}const observer=new ResizeObserver(measure);observer.observe(element);return()=>observer.disconnect();},[]);
 const ratio=width/plate.width;
 const quad=plate.screen.map(([x,y])=>[x*ratio,y*ratio]) as unknown as Quad;
 const transform=width?`matrix3d(${projectScreen(quad,1000,625).join(',')})`:undefined;
 return <div ref={root} className="project-art photographic-mockup" style={{aspectRatio:`${plate.width}/${plate.height}`}}>
  <Image src={plate.src} alt="" aria-hidden="true" width={plate.width} height={plate.height} sizes="(max-width:700px) 100vw, 70vw" className="laptop-environment" />
  <div className={width?'projected-screen is-positioned':'projected-screen screen-fallback'} style={width?{width:1000,height:625,transform}:undefined}>
   <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width:700px) 85vw, 60vw" className="projected-capture" />
  </div>
 </div>;
}
