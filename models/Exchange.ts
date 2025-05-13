/**
 * Representa un intercambio (exchange) de criptomonedas con información básica
 */
export class Exchange {
  /**
   * Identificador único del exchange en la API de CoinLore
   */
  id: string;
  
  /**
   * Nombre del exchange (ej. Binance, Coinbase)
   */
  name: string;
  
  /**
   * Volumen de trading en dólares estadounidenses en las últimas 24 horas
   */
  volumeUsd24h: number;
  
  /**
   * Número de pares de trading activos en el exchange
   */
  activePairs: number;
  
  /**
   * URL del sitio web oficial del exchange
   */
  url: string;
  
  /**
   * País de origen o ubicación del exchange
   */
  country: string;

  /**
   * Constructor que inicializa una instancia de Exchange a partir de datos de la API
   * @param data Objeto con datos del exchange proveniente de la API
   */
  constructor(data: any) {
    // Console log para depuración
    console.log('Datos crudos de Exchange:', JSON.stringify(data));
    
    this.id = data.id || '';
    this.name = data.name || '';
    // Manejar diferentes formatos posibles para el volumen
    this.volumeUsd24h = this.safeParseFloat(data.volume_usd || data.volumeUsd || data.volume_usd_24h);
    // Manejar diferentes formatos posibles para pares activos
    this.activePairs = this.safeParseInt(data.active_pairs || data.activePairs);
    this.url = data.url || '';
    this.country = data.country || '';
    
    // Log del objeto construido para depuración
    console.log('Exchange construido:', {
      id: this.id,
      name: this.name,
      volumeUsd24h: this.volumeUsd24h,
      activePairs: this.activePairs
    });
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
   * Convierte de forma segura un valor a número entero, devolviendo 0 si el parsing falla
   * @param value Valor a convertir, puede ser string o número
   * @returns Número entero o 0 si el parsing falla
   */
  private safeParseInt(value: any): number {
    if (value === undefined || value === null) return 0;
    try {
      // Maneja tanto entradas de tipo string como number
      const numValue = typeof value === 'string' ? parseInt(value, 10) : Math.round(value);
      return isNaN(numValue) ? 0 : numValue;
    } catch (e) {
      console.error('Error parsing int:', e);
      return 0;
    }
  }

  /**
   * Método de fábrica para crear una instancia de Exchange a partir de la respuesta de la API
   * @param data Datos de un exchange provenientes de la API
   * @returns Una nueva instancia de Exchange
   */
  static fromApiResponse(data: any): Exchange {
    return new Exchange(data);
  }

  /**
   * Crear múltiples instancias de Exchange a partir de un array de respuestas de la API
   * @param data Array de datos de exchanges provenientes de la API
   * @returns Array de instancias de Exchange
   */
  static fromApiResponseArray(data: any[]): Exchange[] {
    if (!data || data.length === 0) {
      console.warn('Exchange.fromApiResponseArray: datos vacíos o no válidos');
      return [];
    }
    
    console.log(`Procesando ${data.length} exchanges`);
    return data.map(item => Exchange.fromApiResponse(item));
  }
} 