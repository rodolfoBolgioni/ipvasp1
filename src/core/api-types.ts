/**
 * Tipos para a API de Dados Abertos da ALESP
 * Baseado na documentação/retorno da API: https://legis-backend-api-portal.pub.al.sp.gov.br/
 */

export interface AlespDeputySummary {
    nuMatricula: number;
    txNomeParlamentar: string;
    txPartido: string;
    txFoto: string; // URL parcial ou completa
    txSala?: string;
    // Outros campos omitidos pois não são usados no momento
}

export interface AlespListResponse {
    content: AlespDeputySummary[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface AlespBiography {
    txEmail?: string;
    nuRamal?: string; // Telefone
    nuSala?: string;
    numeroSala?: string;
    sala?: string;
    txSala?: string;
    txFotoGrande?: string;
    txAreaAtuacao?: string;
    txBaseEleitoral?: string;
    txMissao?: string;
}

export interface AlespDeputyDetail {
    nuMatricula: number;
    txNomeParlamentar: string;
    txPartido: string;
    biografia?: AlespBiography;
}

// Formato do nosso arquivo local (JSON)
export interface LocalDeputyData {
    lastUpdated: string;
    deputies: LocalDeputy[];
}

export interface LocalDeputy {
    id: number;
    name: string;
    party: string;
    email: string;
    phone: string;
    photo: string;
    room: string;
    areasOfActivity: string;
    electoralBase: string;
}
