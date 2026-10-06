import Image from 'next/image';
import type {Language} from '@/components/language-provider';
import {articleIllustrations} from '@/lib/article-illustrations';
export function ArticleIllustration({slug,language,hero=false}:{slug:string;language:Language;hero?:boolean}) {
 const image=articleIllustrations[slug];if(!image)return null;
 return <div className={hero?'article-hero-illustration':'article-thumbnail'}>
  <Image src={image.src} alt={image.alt[language]} width={image.width} height={image.height} sizes={hero?'(max-width: 700px) 100vw, 1040px':'(max-width: 700px) 100vw, 33vw'} priority={hero} />
 </div>;
}
