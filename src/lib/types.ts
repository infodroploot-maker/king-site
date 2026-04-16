export type BookingStatus = 'nuova_richiesta' | 'appuntamento_fissato' | 'in_attesa_consegna' | 'in_lavorazione' | 'pronto_al_ritiro' | 'consegnato'
export type ServiceType = 'cambio_gomme' | 'carrozzeria' | 'elettrauto' | 'meccanica_generale' | 'tagliando' | 'revisione' | 'diagnosi' | 'altro'

export interface Booking {
  id: string; created_at: string; nome: string; cognome: string; telefono: string;
  servizio: ServiceType; marca: string; modello: string; anno: string; targa: string;
  status: BookingStatus; data_appuntamento: string | null; ore_lavoro: number | null;
  preventivo_euro: number | null; note_meccanico: string | null; user_id: string | null;
}

export const SERVICE_LABELS: Record<ServiceType, string> = {
  cambio_gomme: 'Cambio Gomme', carrozzeria: 'Carrozzeria', elettrauto: 'Elettrauto',
  meccanica_generale: 'Meccanica Generale', tagliando: 'Tagliando', revisione: 'Revisione',
  diagnosi: 'Diagnosi Elettronica', altro: 'Altro',
}

export const SERVICE_IMAGES: Record<ServiceType, string> = {
  cambio_gomme: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&q=80',
  carrozzeria: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&q=80',
  elettrauto: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
  meccanica_generale: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80',
  tagliando: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80',
  revisione: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&q=80',
  diagnosi: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
  altro: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
}

export const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string; icon: string }> = {
  nuova_richiesta: { label: 'Nuova Richiesta', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: '📋' },
  appuntamento_fissato: { label: 'Appuntamento Fissato', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', icon: '🔵' },
  in_attesa_consegna: { label: 'In Attesa Consegna', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', icon: '🟠' },
  in_lavorazione: { label: 'In Lavorazione', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', icon: '🔴' },
  pronto_al_ritiro: { label: 'Pronto al Ritiro', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', icon: '🟢' },
  consegnato: { label: 'Consegnato', color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/20', icon: '⚫' },
}
