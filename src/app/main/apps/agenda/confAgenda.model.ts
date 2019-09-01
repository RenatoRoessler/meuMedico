
export interface confAgenda {
    id_confAgenda ?: string;
    id_user : string;
    dia : number; // 0 domingo... 7 sabado
    horaInicio: Date;
    horaFinal: Date;
    intervalo: number;
}