export interface DriverModel {
  id_conductor?: number;
  cedula?: number;
  nombre_apellido: string;
  cargo: string;
  vencimiento_licencia: string;
  dias_restantes_licencia?: number;
  comparendos: string;
  acuerdo_pago: string;
  vencimiento_curso: string;
  dias_restantes_curso?: number;
}

export interface RegisterDriverModel {
  cedula?: number;
  nombre_apellido: string;
  cargo: string;
  vencimiento_licencia: string;
  dias_restantes_licencia?: number;
  comparendos: string;
  acuerdo_pago: string;
  vencimiento_curso: string;
  dias_restantes_curso?: number;
}
