import { Exchange } from './Exchange';

/**
 * Representa un par de trading en un intercambio de criptomonedas
 */
export interface TradingPair {
  /**
   * Nombre del par de trading (ej. BTC/USDT)
   */
  pair: string;
  
  /**
   * Símbolo de la moneda base (ej. BTC)
   */
  base: string;
  
  /**
   * Símbolo de la moneda cotizada (ej. USDT)
   */
  quote: string;
  
  /**
   * Volumen de trading en dólares estadounidenses en las últimas 24 horas
   */
  volumeUsd24h: number;
  
  /**
   * Precio actual del par en la moneda cotizada
   */
  price: number;
  
  /**
   * Precio actual del par convertido a dólares estadounidenses
   */
  priceUsd: number;
  
  /**
   * Timestamp de la última actualización de los datos
   */
  time: number;
  
  /**
   * Porcentaje del volumen total del exchange que representa este par
   * Puede ser undefined si la API no proporciona este dato
   */
  volumePercent?: number;
}

/**
 * Representa los detalles completos de un intercambio con sus pares de trading
 * Extiende el modelo básico Exchange con pares de trading y detalles adicionales
 */
export class ExchangeDetails extends Exchange {
  /**
   * Lista de pares de trading disponibles en el exchange
   */
  tradingPairs: TradingPair[];
  
  /**
   * Fecha de establecimiento o fundación del exchange
   * Puede ser null si la API no proporciona este dato
   */
  dateEstablished: Date | null;
  
  /**
   * URL del perfil de Twitter del exchange
   */
  twitterUrl: string;
  
  /**
   * Descripción del exchange
   */
  description: string;
  
  /**
   * Fecha en que el exchange comenzó operaciones
   * Puede ser null si la API no proporciona este dato
   */
  dateLive: Date | null;

  /**
   * Constructor que inicializa una instancia de ExchangeDetails a partir de datos de la API
   * @param data Objeto con datos detallados del exchange proveniente de la API
   */
  constructor(data: any) {
    // Depuración de los datos recibidos
    console.log('Datos crudos de ExchangeDetails:', JSON.stringify(data));
    
    // Si la respuesta tiene el formato { "0": {...}, "pairs": [...] }
    let exchangeData = data;
    let pairsData = data.pairs || [];
    
    // Comprobar si tenemos un formato de respuesta anidado
    if (data["0"] && typeof data["0"] === 'object') {
      exchangeData = {
        ...data["0"],
        // Asegurar que tenemos un id
        id: exchangeData.id || ""
      };
    }
    
    super(exchangeData);
    
    // Campos adicionales
    this.tradingPairs = [];
    this.dateEstablished = exchangeData.date_established ? new Date(exchangeData.date_established * 1000) : null;
    this.dateLive = exchangeData.date_live ? new Date(exchangeData.date_live * 1000) : null;
    this.twitterUrl = exchangeData.twitter_url || '';
    this.description = exchangeData.description || '';
    
    // Procesar los pares de trading
    if (Array.isArray(pairsData)) {
      console.log(`Procesando ${pairsData.length} pares de trading`);
      
      this.tradingPairs = pairsData.map((pairData: any) => {
        // Crear un identificador de par único si no existe
        const pairName = pairData.pair || `${pairData.base}/${pairData.quote || 'UNKNOWN'}`;
        
        return {
          pair: pairName,
          base: pairData.base || '',
          quote: pairData.quote || '',
          volumeUsd24h: this.parseFloat(pairData.volume),
          price: this.parseFloat(pairData.price),
          priceUsd: this.parseFloat(pairData.price_usd),
          time: pairData.time || 0,
          volumePercent: this.parseFloat(pairData.volume_percent)
        };
      });
      
      // Calcular porcentajes de volumen si no están presentes
      const totalVolume = this.tradingPairs.reduce((sum, pair) => sum + pair.volumeUsd24h, 0);
      if (totalVolume > 0) {
        this.tradingPairs.forEach(pair => {
          if (!pair.volumePercent) {
            pair.volumePercent = (pair.volumeUsd24h / totalVolume) * 100;
          }
        });
      }
    }
    
    console.log('ExchangeDetails construido:', {
      id: this.id,
      name: this.name,
      pairsCount: this.tradingPairs.length
    });
  }

  /**
   * Convierte de forma segura un valor a número decimal, devolviendo 0 si el parsing falla
   * @param value Valor a convertir, puede ser string o número
   * @returns Número decimal o 0 si el parsing falla
   */
  private parseFloat(value: any): number {
    if (value === undefined || value === null) return 0;
    try {
      // Maneja tanto entradas de tipo string como number
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      return isNaN(numValue) ? 0 : numValue;
    } catch (e) {
      console.error('Error parsing float:', e);
      return 0;
    }
  }

  /**
   * Método de fábrica para crear una instancia de ExchangeDetails a partir de la respuesta de la API
   * @param data Datos detallados de un exchange provenientes de la API
   * @returns Una nueva instancia de ExchangeDetails
   */
  static fromApiResponse(data: any): ExchangeDetails {
    return new ExchangeDetails(data);
  }
} 