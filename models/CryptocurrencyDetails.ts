import { Cryptocurrency } from './Cryptocurrency';

/**
 * Representa información detallada sobre una criptomoneda
 * Extiende el modelo básico Cryptocurrency con detalles adicionales
 */
export class CryptocurrencyDetails extends Cryptocurrency {
  /**
   * Cambio porcentual de precio en la última hora (positivo o negativo)
   */
  percentChange1h: number;
  
  /**
   * Cambio porcentual de precio en los últimos 7 días (positivo o negativo)
   */
  percentChange7d: number;
  
  /**
   * Cambio porcentual de precio en los últimos 30 días (positivo o negativo)
   * Puede ser undefined si la API no proporciona este dato
   */
  percentChange30d?: number;
  
  /**
   * Cantidad de tokens/monedas actualmente en circulación en el mercado
   */
  circulatingSupply: number;
  
  /**
   * Suministro máximo posible de tokens/monedas que podrán existir
   * Puede ser undefined si la criptomoneda no tiene un límite máximo
   */
  maxSupply?: number;
  
  /**
   * Suministro total de tokens/monedas (incluyendo los que no están en circulación)
   * Puede ser undefined si la API no proporciona este dato
   */
  totalSupply?: number;
  
  /**
   * Volumen de trading en las últimas 24 horas en dólares estadounidenses
   */
  volume24: number;
  
  /**
   * Volumen ajustado de trading en las últimas 24 horas
   * Puede ser undefined si la API no proporciona este dato
   */
  volume24a?: number;
  
  /**
   * Fecha y hora de la última actualización de los datos
   */
  lastUpdated: Date;
  
  /**
   * Identificador del nombre para uso en URLs (en formato slug)
   */
  nameid: string;
  
  /**
   * Precio actual en Bitcoin (BTC)
   */
  priceBtc: number;

  /**
   * Constructor que inicializa una instancia de CryptocurrencyDetails a partir de datos de la API
   * @param data Objeto con datos detallados de la criptomoneda proveniente de la API
   */
  constructor(data: any) {
    super(data);
    
    this.percentChange1h = parseFloat(data.percent_change_1h || '0');
    this.percentChange7d = parseFloat(data.percent_change_7d || '0');
    this.percentChange30d = data.percent_change_30d 
      ? parseFloat(data.percent_change_30d) 
      : undefined;
    
    this.circulatingSupply = parseFloat(data.csupply || data.circulating_supply || '0');
    this.maxSupply = data.msupply || data.max_supply 
      ? parseFloat(data.msupply || data.max_supply) 
      : undefined;
    this.totalSupply = data.tsupply 
      ? parseFloat(data.tsupply) 
      : undefined;
    
    this.volume24 = parseFloat(data['24h_volume_usd'] || data.volume24 || '0');
    this.volume24a = data.volume24a 
      ? parseFloat(data.volume24a) 
      : undefined;
    this.priceBtc = parseFloat(data.price_btc || '0');
    this.lastUpdated = new Date(data.last_updated * 1000 || Date.now());
    this.nameid = data.nameid || data.name.toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Método de fábrica para crear una instancia de CryptocurrencyDetails a partir de la respuesta de la API
   * @param data Datos detallados de una criptomoneda provenientes de la API
   * @returns Una nueva instancia de CryptocurrencyDetails
   */
  static fromApiResponse(data: any): CryptocurrencyDetails {
    return new CryptocurrencyDetails(data);
  }
}