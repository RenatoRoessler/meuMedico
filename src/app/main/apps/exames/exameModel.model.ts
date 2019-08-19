export interface ExameModel {
    id_Exame?: string;
    descricao: string;
    valorPadrao: number;
    atendeExame : boolean;
    ativo?: boolean;
    //id_plano?: string;
}