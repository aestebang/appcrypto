/**
 * Representa estadísticas globales del mercado de criptomonedas
 */
export class MarketStats {
  /**
   * Capitalización total del mercado de criptomonedas en dólares estadounidenses
   */
  totalMarketCap: number;
  
  /**
   * Volumen total de trading en las últimas 24 horas en dólares estadounidenses
   */
  total24hVolume: number;
  
  /**
   * Porcentaje de dominancia de Bitcoin en el mercado (basado en capitalización)
   */
  btcDominance: number;
  
  /**
   * Porcentaje de dominancia de Ethereum en el mercado (basado en capitalización)
   */
  ethDominance: number;
  
  /**
   * Número total de criptomonedas activas en el mercado
   */
  activeCryptocurrencies: number;
  
  /**
   * Número total de exchanges activos
   */
  activeExchanges: number;
  
  /**
   * Cambio porcentual en la capitalización total del mercado en las últimas 24 horas
   */
  marketCapChange24h: number;
  
  /**
   * Cambio porcentual en el volumen total de trading en las últimas 24 horas
   */
  volumeChange24h: number;
  
  /**
   * Promedio de cambio porcentual en el precio de todas las criptomonedas
   */
  avgChangePercent: number;
  
  /**
   * Capitalización máxima histórica (All-Time High) del mercado
   */
  marketCapATH: number;
  
  /**
   * Volumen máximo histórico (All-Time High) de trading
   */
  volumeATH: number;

  /**
   * Constructor que inicializa una instancia de MarketStats a partir de datos de la API
   * @param data Objeto con estadísticas globales del mercado proveniente de la API
   */
  constructor(data: any) {
    // Asegurar que todos los valores numéricos se conviertan correctamente
    this.totalMarketCap = this.safeParseFloat(data.total_mcap);
    this.total24hVolume = this.safeParseFloat(data.total_volume);
    this.btcDominance = this.safeParseFloat(data.btc_d);
    this.ethDominance = this.safeParseFloat(data.eth_d);
    this.activeCryptocurrencies = this.safeParseInt(data.coins_count);
    this.activeExchanges = this.safeParseInt(data.active_markets);
    this.marketCapChange24h = this.safeParseFloat(data.mcap_change);
    this.volumeChange24h = this.safeParseFloat(data.volume_change);
    this.avgChangePercent = this.safeParseFloat(data.avg_change_percent);
    this.marketCapATH = this.safeParseFloat(data.mcap_ath);
    this.volumeATH = this.safeParseFloat(data.volume_ath);
    
    console.log('Parsed MarketStats:', {
      totalMarketCap: this.totalMarketCap,
      total24hVolume: this.total24hVolume,
      btcDominance: this.btcDominance,
      ethDominance: this.ethDominance,
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
   * Método de fábrica para crear una instancia de MarketStats a partir de la respuesta de la API
   * @param data Datos de estadísticas globales del mercado provenientes de la API
   * @returns Una nueva instancia de MarketStats
   */
  static fromApiResponse(data: any): MarketStats {
    return new MarketStats(data);
  }
}