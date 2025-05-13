/**
 * Representa un mercado (exchange) donde se comercia una criptomoneda específica
 */
export class Market {
  /**
   * Nombre del exchange o mercado
   */
  name: string;
  
  /**
   * Par de trading (ej. BTC/USD)
   */
  pair: string;
  
  /**
   * Volumen de trading en dólares estadounidenses en las últimas 24 horas
   */
  volumeUsd24h: number;
  
  /**
   * Precio actual en dólares estadounidenses
   */
  price: number;
  
  /**
   * Porcentaje del volumen total de la criptomoneda que representa este mercado
   */
  percentVolume: number;
  
  /**
   * Fecha y hora de la última actualización de los datos
   */
  updated: Date;
  
  /**
   * Identificador único del exchange en la API
   */
  exchangeId: string;

  /**
   * Constructor que inicializa una instancia de Market a partir de datos de la API
   * @param data Objeto con datos del mercado proveniente de la API
   */
  constructor(data: any) {
    this.name = data.name || '';
    this.pair = data.pair || '';
    this.volumeUsd24h = this.safeParseFloat(data.volume_usd);
    this.price = this.safeParseFloat(data.price_usd);
    this.percentVolume = this.safeParseFloat(data.percent_volume);
    this.updated = new Date(data.time ? parseInt(data.time) * 1000 : Date.now());
    this.exchangeId = data.id || '';
  }

  /**
   * Convierte de forma segura un valor a número decimal, devolviendo 0 si el parsing falla
   * @param value Valor a convertir, puede ser string o número
   * @returns Número decimal o 0 si el parsing falla
   */
  private safeParseFloat(value: any): number {
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
   * Método de fábrica para crear una instancia de Market a partir de la respuesta de la API
   * @param data Datos de un mercado provenientes de la API
   * @returns Una nueva instancia de Market
   */
  static fromApiResponse(data: any): Market {
    return new Market(data);
  }

  /**
   * Crear múltiples instancias de Market a partir de un array de respuestas de la API
   * @param data Array de datos de mercados provenientes de la API
   * @returns Array de instancias de Market
   */
  static fromApiResponseArray(data: any[]): Market[] {
    return data.map(item => Market.fromApiResponse(item));
  }
} 