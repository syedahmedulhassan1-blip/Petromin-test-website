import { supabase } from '../lib/supabase';
import { logger } from './logger';

export const WHATSAPP_NUMBER = '971565012716';

export const WhatsAppMessages = {
  fleetQuote: 'Hello! I\'m interested in getting a *Fleet Maintenance Quote* for my business. Could you please provide me with more information about your B2B packages and pricing?',

  fleetProposal: 'Hello! I would like to request a *Custom Fleet Proposal* for my company. Please help me schedule a meeting with your fleet solutions team to discuss our requirements.',

  generalInquiry: 'Hello! I have a question about Petromin Express services. Could you please assist me?',

  serviceBooking: 'Hello! I would like to book a service appointment at Petromin Express. Could you please help me with the available time slots?',

  carPickup: 'Hello! I would like to request *Car Pickup Service* for my vehicle. Could you please provide me with the charges and arrange for pickup?',

  batteryService: 'Hello! I\'m interested in the *Battery Diagnosis & Replacement Service*. Could you please provide me with pricing and availability?',

  contactSupport: 'Hello! I need assistance with Petromin Express services. Could you please help me?',
};

export const openWhatsApp = async (message: string, context?: { source?: string; customerPhone?: string }) => {
  const encodedMessage = encodeURIComponent(message);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const whatsappUrl = isMobile
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

  try {
    const { data, error } = await supabase.from('whatsapp_leads').insert({
      offer_title: context?.source || 'General',
      offer_subtitle: message.substring(0, 100),
      customer_phone: context?.customerPhone || null,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });

    if (error) {
      logger.error('Error tracking WhatsApp lead:', error);
      console.error('WhatsApp tracking error:', error);
    } else {
      console.log('WhatsApp lead tracked successfully:', data);
    }
  } catch (error) {
    logger.error('Exception tracking WhatsApp lead', error instanceof Error ? error : new Error(String(error)));
    console.error('WhatsApp tracking exception:', error);
  }

  if (isMobile) {
    window.location.href = whatsappUrl;
  } else {
    window.open(whatsappUrl, '_blank');
  }
};
