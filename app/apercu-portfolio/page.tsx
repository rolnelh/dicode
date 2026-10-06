import type {Metadata} from 'next';
import {Hero} from '@/components/sections/hero';
export const metadata:Metadata={title:'Aperçu responsive du portfolio',robots:{index:false,follow:false},alternates:{canonical:'/'}};
/** Deliberately no project gallery: embedded previews cannot recursively embed themselves. */
export default function PortfolioPreview(){return <div data-portfolio-preview><Hero/></div>;}
