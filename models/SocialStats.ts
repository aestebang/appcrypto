/**
 * Representa las estadísticas sociales de una criptomoneda obtenidas desde diversas plataformas
 */
export class SocialStats {
  // ======== Twitter stats ========
  /**
   * Número de seguidores en Twitter
   */
  twitterFollowers: number = 0;
  
  /**
   * Número de tweets/estados publicados en la cuenta de Twitter
   */
  twitterStatus: number = 0;
  
  /**
   * Número de favoritos recibidos en Twitter
   */
  twitterFavorites: number = 0;
  
  /**
   * Fecha de creación de la cuenta de Twitter
   * Puede ser null si la API no proporciona este dato
   */
  twitterAccountCreation: Date | null = null;
  
  /**
   * Nombre de usuario en Twitter
   */
  twitterName: string = '';
  
  /**
   * Enlace al perfil de Twitter
   */
  twitterLink: string = '';

  // ======== Reddit stats ========
  /**
   * Número de suscriptores en el subreddit de la criptomoneda
   */
  redditSubscribers: number = 0;
  
  /**
   * Número de usuarios activos en el subreddit
   */
  redditActiveUsers: number = 0;
  
  /**
   * Promedio de publicaciones por día en el subreddit
   */
  redditPostsPerDay: number = 0;
  
  /**
   * Promedio de publicaciones por hora en el subreddit
   */
  redditPostsPerHour: number = 0;
  
  /**
   * Promedio de comentarios por día en el subreddit
   */
  redditCommentsPerDay: number = 0;
  
  /**
   * Promedio de comentarios por hora en el subreddit
   */
  redditCommentsPerHour: number = 0;
  
  /**
   * Enlace al subreddit
   */
  redditLink: string = '';

  // ======== Community stats ========
  /**
   * Número total de miembros en la comunidad (sumando todas las plataformas)
   */
  communityMembers: number = 0;

  /**
   * Constructor que inicializa una instancia de SocialStats a partir de datos de la API
   * @param data Objeto con estadísticas sociales de la criptomoneda proveniente de la API
   */
  constructor(data: any) {
    this.initData(data);
  }

  /**
   * Inicializa los datos a partir de la respuesta de la API
   * @param data Datos de estadísticas sociales provenientes de la API
   */
  private initData(data: any): void {
    // Verificar si estamos recibiendo el formato nuevo de la API
    if (data && data.reddit && data.twitter) {
      // Procesar datos de Reddit en el nuevo formato
      if (data.reddit) {
        this.redditSubscribers = this.safeParseInt(data.reddit.subscribers);
        this.redditActiveUsers = this.safeParseInt(data.reddit.avg_active_users);
      }
      
      // Procesar datos de Twitter en el nuevo formato
      if (data.twitter) {
        this.twitterFollowers = this.safeParseInt(data.twitter.followers_count);
        this.twitterStatus = this.safeParseInt(data.twitter.status_count);
      }
    } else {
      // Formato antiguo (fallback)
      this.initTwitterStats(data);
      this.initRedditStats(data);
      this.initCommunityStats(data);
    }
  }

  /**
   * Inicializa las estadísticas de Twitter (formato antiguo)
   * @param data Datos de estadísticas sociales en formato antiguo
   */
  private initTwitterStats(data: any): void {
    this.twitterFollowers = this.safeParseInt(data.twitter_followers);
    this.twitterStatus = this.safeParseInt(data.twitter_status);
    this.twitterFavorites = this.safeParseInt(data.twitter_favorites);
    this.twitterAccountCreation = data.twitter_account_creation ? new Date(data.twitter_account_creation * 1000) : null;
    this.twitterName = data.twitter_name || '';
    this.twitterLink = data.twitter_link || '';
  }

  /**
   * Inicializa las estadísticas de Reddit (formato antiguo)
   * @param data Datos de estadísticas sociales en formato antiguo
   */
  private initRedditStats(data: any): void {
    this.redditSubscribers = this.safeParseInt(data.reddit_subscribers);
    this.redditActiveUsers = this.safeParseInt(data.reddit_active_users);
    this.redditPostsPerDay = this.safeParseFloat(data.reddit_posts_per_day);
    this.redditPostsPerHour = this.safeParseFloat(data.reddit_posts_per_hour);
    this.redditCommentsPerDay = this.safeParseFloat(data.reddit_comments_per_day);
    this.redditCommentsPerHour = this.safeParseFloat(data.reddit_comments_per_hour);
    this.redditLink = data.reddit_link || '';
  }

  /**
   * Inicializa las estadísticas de la comunidad
   * @param data Datos de estadísticas sociales
   */
  private initCommunityStats(data: any): void {
    this.communityMembers = this.safeParseInt(data.community_members);
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
   * Método de fábrica para crear una instancia de SocialStats a partir de la respuesta de la API
   * @param data Datos de estadísticas sociales provenientes de la API
   * @returns Una nueva instancia de SocialStats
   */
  static fromApiResponse(data: any): SocialStats {
    return new SocialStats(data);
  }
} 