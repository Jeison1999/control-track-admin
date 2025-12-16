export interface Vigilante {
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  activo: boolean;
  creadoEn: string;
  ultimoAcceso?: string;
}
