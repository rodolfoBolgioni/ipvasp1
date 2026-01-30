import fs from 'fs';
import path from 'path';
// Tipos para a API de Dados Abertos da ALESP
export interface AlespDeputySummary {
    nuMatricula: number;
    txNomeParlamentar: string;
    txPartido: string;
    txFoto: string;
    txSala?: string;
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
    nuRamal?: string;
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

// URLs
const LIST_URL = 'https://legis-backend-api-portal.pub.al.sp.gov.br/api_portal/parlamentar-portal/?filtroLegislatura=20&filtroEmExercicioPesquisa=S';
const DETAIL_URL_BASE = 'https://legis-backend-api-portal.pub.al.sp.gov.br/api_portal/parlamentar-portal/detalhes/';
const PHOTO_BASE_URL = 'https://www3.al.sp.gov.br/legis';

function normalizeText(text: string | null | undefined): string {
    if (!text) return '';
    return text.trim();
}

function resolvePhotoUrl(photoPath: string | null | undefined): string {
    if (!photoPath) return '';
    // Algumas URLs já vêm completas, outras relativas
    if (photoPath.startsWith('http')) return photoPath;

    // Garantir que não duplique a barra ou o domínio
    const cleanPath = photoPath.replace('https://www.al.sp.gov.br', '');
    return `${PHOTO_BASE_URL}${cleanPath}`;
}

function resolveRoom(bio: any, summarySala?: string): string {
    const fromBio = bio?.nuSala || bio?.txSala || bio?.numeroSala || bio?.sala;
    return normalizeText(fromBio || summarySala);
}

async function fetchDeputies(): Promise<void> {
    try {
        console.log('🚀 Iniciando atualização da lista de deputados...');

        // Setup common fetch options
        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json"
        };
        const timeout = 30000; // 30 seconds

        // 1. Fetch List
        console.log('📡 Buscando lista de matrículas...');
        const listRes = await fetch(LIST_URL, {
            headers,
            signal: AbortSignal.timeout(timeout)
        });

        if (!listRes.ok) throw new Error(`Falha ao buscar lista: ${listRes.statusText}`);

        const listData: AlespListResponse = await listRes.json();
        const summaries = listData.content;
        console.log(`✅ Encontrados ${summaries.length} deputados.`);

        const deputies: LocalDeputy[] = [];
        const BATCH_SIZE = 10;

        // 2. Fetch Details (Batching)
        for (let i = 0; i < summaries.length; i += BATCH_SIZE) {
            const chunk = summaries.slice(i, i + BATCH_SIZE);
            const currentBatch = Math.floor(i / BATCH_SIZE) + 1;
            const totalBatches = Math.ceil(summaries.length / BATCH_SIZE);

            console.log(`⏳ Processando lote ${currentBatch}/${totalBatches}...`);

            const promises = chunk.map(async (summary) => {
                try {
                    const detailRes = await fetch(`${DETAIL_URL_BASE}${summary.nuMatricula}`, {
                        headers,
                        signal: AbortSignal.timeout(timeout)
                    });
                    const detail: AlespDeputyDetail = await detailRes.json();
                    const bio = detail.biografia || {};

                    const deputy: LocalDeputy = {
                        id: summary.nuMatricula,
                        name: normalizeText(summary.txNomeParlamentar),
                        party: normalizeText(summary.txPartido),
                        email: normalizeText(detail.biografia?.txEmail || bio.txEmail),
                        phone: normalizeText(detail.biografia?.nuRamal || bio.nuRamal),
                        photo: resolvePhotoUrl(detail.biografia?.txFotoGrande || summary.txFoto),
                        room: resolveRoom(bio, summary.txSala),
                        areasOfActivity: normalizeText(bio.txAreaAtuacao),
                        electoralBase: normalizeText(bio.txBaseEleitoral)
                    };
                    return deputy;
                } catch (err) {
                    console.error(`❌ Erro ao buscar detalhes de ${summary.txNomeParlamentar} (${summary.nuMatricula})`, err);
                    // Retorna dados parciais em caso de falha no detalhe
                    return {
                        id: summary.nuMatricula,
                        name: normalizeText(summary.txNomeParlamentar),
                        party: normalizeText(summary.txPartido),
                        email: '',
                        phone: '',
                        photo: resolvePhotoUrl(summary.txFoto),
                        room: normalizeText(summary.txSala),
                        areasOfActivity: '',
                        electoralBase: ''
                    } as LocalDeputy;
                }
            });

            const processedChunk = await Promise.all(promises);
            deputies.push(...processedChunk);
        }

        // 3. Save Data
        // 3. Save Data
        const sortedDeputies = deputies.sort((a, b) => a.name.localeCompare(b.name));
        const outputPath = path.join(process.cwd(), 'src/data/deputies.json');

        // Check if data changed
        if (fs.existsSync(outputPath)) {
            try {
                const existingFile = fs.readFileSync(outputPath, 'utf-8');
                const existingData: LocalDeputyData = JSON.parse(existingFile);
                const existingDeputiesMap = new Map(existingData.deputies.map(d => [d.id, d]));

                // Validate and fallback to existing data if new data is missing fields
                const validatedDeputies = sortedDeputies.map(newDeputy => {
                    if (!newDeputy.email || !newDeputy.phone) {
                        const existing = existingDeputiesMap.get(newDeputy.id);
                        if (existing) {
                            if (!newDeputy.email && existing.email) {
                                console.warn(`⚠️ Dados faltantes (Email) para ${newDeputy.name}. Mantendo valor anterior.`);
                                newDeputy.email = existing.email;
                            }
                            if (!newDeputy.phone && existing.phone) {
                                console.warn(`⚠️ Dados faltantes (Tel) para ${newDeputy.name}. Mantendo valor anterior.`);
                                newDeputy.phone = existing.phone;
                            }
                        }
                    }
                    return newDeputy;
                });

                // Compare only deputy content, ignoring lastUpdated
                if (JSON.stringify(existingData.deputies) === JSON.stringify(validatedDeputies)) {
                    console.log('🛑 Nenhuma alteração nos dados detectada. Mantendo arquivo existente.');
                    return;
                }

                // Use validated list for saving
                sortedDeputies.splice(0, sortedDeputies.length, ...validatedDeputies);

            } catch (e) {
                console.warn('⚠️ Erro ao ler arquivo existente, forçando atualização.');
            }
        }

        const finalData: LocalDeputyData = {
            lastUpdated: new Date().toISOString(),
            deputies: sortedDeputies
        };

        // Garante que o diretório existe
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2), 'utf-8');
        console.log(`✨ Sucesso! ${deputies.length} deputados salvos em ${outputPath}`);
        console.log(`📅 Última atualização: ${finalData.lastUpdated}`);

    } catch (error) {
        console.error('🔥 Erro ao atualizar deputados (API Indisponível ou Bloqueio):', error);
        console.warn('⚠️ Continuando pipeline sem atualizar dados dos deputados.');
        // Exit with 0 to prevent pipeline failure
        process.exit(0);
    }
}

fetchDeputies();
