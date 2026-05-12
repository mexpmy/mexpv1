import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  // Ensure the locale is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
 console.log("DEBUG: Loading messages for locale:", locale);
 
  return {
    locale, // Mandatory
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC'
  };
});