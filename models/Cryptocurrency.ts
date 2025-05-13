/**
 * Representa una criptomoneda con información básica obtenida desde la API
 */
export class Cryptocurrency {
  /**
   * Identificador único de la criptomoneda en la API de CoinLore
   */
  id: string;
  
  /**
   * Nombre completo de la criptomoneda (ej. Bitcoin, Ethereum)
   */
  name: string;
  
  /**
   * Símbolo/ticker de la criptomoneda (ej. BTC, ETH)
   */
  symbol: string;
  
  /**
   * Posición en el ranking global por capitalización de mercado
   */
  rank: number;
  
  /**
   * Precio actual en dólares estadounidenses (USD)
   */
  priceUsd: number;
  
  /**
   * Cambio porcentual de precio en las últimas 24 horas (positivo o negativo)
   */
  percentChange24h: number;
  
  /**
   * Capitalización de mercado en dólares estadounidenses (precio × oferta circulante)
   */
  marketCapUsd: number;
  
  /**
   * Volumen de trading en las últimas 24 horas en dólares estadounidenses
   */
  volume24h: number;

  /**
   * Constructor que inicializa una instancia de Cryptocurrency a partir de datos de la API
   * @param data Objeto con datos de la criptomoneda proveniente de la API
   */
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.symbol = data.symbol;
    this.rank = parseInt(data.rank, 10);
    this.priceUsd = parseFloat(data.price_usd || '0');
    this.percentChange24h = parseFloat(data.percent_change_24h || '0');
    this.marketCapUsd = parseFloat(data.market_cap_usd || '0');
    this.volume24h = parseFloat(data['24h_volume_usd'] || '0');
  }

  /**
   * Método de fábrica para crear una instancia de Cryptocurrency a partir de la respuesta de la API
   * @param data Datos de una criptomoneda provenientes de la API
   * @returns Una nueva instancia de Cryptocurrency
   */
  static fromApiResponse(data: any): Cryptocurrency {
    return new Cryptocurrency(data);
  }

  /**
   * Crear múltiples instancias de Cryptocurrency a partir de un array de respuestas de la API
   * @param data Array de datos de criptomonedas provenientes de la API
   * @returns Array de instancias de Cryptocurrency
   */
  static fromApiResponseArray(data: any[]): Cryptocurrency[] {
    return data.map(item => Cryptocurrency.fromApiResponse(item));
  }
}