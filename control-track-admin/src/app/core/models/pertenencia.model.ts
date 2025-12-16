export type EstadoPertenencia = 'ADENTRO' | 'AFUERA';

export interface Pertenencia {
  id: string;
  usuarioId: string;
  tipoPertenenciaId: string;
  datos: Record<string, any>; // JSON con campos dinámicos
  estado: EstadoPertenencia;
  creadaPorId: string;
  creadoEn: string;
  actualizadoEn: string;
}
