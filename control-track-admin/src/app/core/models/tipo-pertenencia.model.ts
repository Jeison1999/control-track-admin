export interface TipoPertenencia {
  id: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  campos: CampoPersonalizado[];
  creadoEn: string;
}

export interface CampoPersonalizado {
  nombre: string;
  tipo: 'texto' | 'numero' | 'placa' | 'email' | 'telefono' | 'fecha' | 'seleccion';
  requerido: boolean;
  opciones?: string[]; // Para tipo 'seleccion'
}
