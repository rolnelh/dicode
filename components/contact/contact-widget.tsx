import { BrandIcon } from '@/components/ui/brand-icon';
import { site } from '@/lib/site';
import type { Language } from '@/components/language-provider';

/** Single integration point: replace this link with a chat widget when ready. */
export function ContactWidget({ language }: { language: Language }) {
 const label = language === 'en' ? 'Contact me on WhatsApp' : 'Me contacter sur WhatsApp';
 return <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-widget" aria-label={label}>
  <span className="contact-widget-icon" aria-hidden="true"><BrandIcon name="whatsapp" /></span>
  <span>{language === 'en' ? 'Contact me' : 'Me contacter'}<small>{language === 'en' ? 'on WhatsApp' : 'sur WhatsApp'}</small></span>
 </a>;
}
