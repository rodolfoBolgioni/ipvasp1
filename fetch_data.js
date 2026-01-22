const fs = require('fs');
const path = require('path');

const LIST_URL = 'https://legis-backend-api-portal.pub.al.sp.gov.br/api_portal/parlamentar-portal/?filtroLegislatura=20&filtroEmExercicioPesquisa=S';
const DETAIL_URL_BASE = 'https://legis-backend-api-portal.pub.al.sp.gov.br/api_portal/parlamentar-portal/detalhes/';
const PHOTO_BASE_URL = 'https://www.al.sp.gov.br';

async function fetchDeputies() {
    console.log('Fetching deputy list...');
    const listResponse = await fetch(LIST_URL);
    const listData = await listResponse.json();
    const deputies = listData.content;
    console.log(`Found ${deputies.length} deputies.`);

    const results = [];
    const BATCH_SIZE = 10;

    for (let i = 0; i < deputies.length; i += BATCH_SIZE) {
        const batch = deputies.slice(i, i + BATCH_SIZE);
        console.log(`Fetching batch ${i / BATCH_SIZE + 1} of ${Math.ceil(deputies.length / BATCH_SIZE)}...`);

        const promises = batch.map(async (dep) => {
            try {
                const detailResponse = await fetch(`${DETAIL_URL_BASE}${dep.nuMatricula}`);
                const detailData = await detailResponse.json();
                const bio = detailData.biografia || {};

                return {
                    name: dep.txNomeParlamentar,
                    party: dep.txPartido,
                    email: dep.txEmail || bio.txEmail || '',
                    phone: dep.txTelefone || bio.nuRamal || '',
                    photo: (bio.txFotoGrande || dep.txFoto) ? `${PHOTO_BASE_URL}${(bio.txFotoGrande || dep.txFoto).replace('https://www.al.sp.gov.br', '')}` : '',
                    room: bio.nuSala || dep.txSala || bio.txSala || bio.numeroSala || bio.sala || '',
                    areasOfActivity: bio.txAreaAtuacao || '',
                    electoralBase: bio.txBaseEleitoral || ''
                };
            } catch (error) {
                console.error(`Error fetching details for ${dep.txNomeParlamentar}:`, error);
                return {
                    name: dep.txNomeParlamentar,
                    party: dep.txPartido,
                    error: true
                };
            }
        });

        const batchResults = await Promise.all(promises);
        results.push(...batchResults);
    }

    const outputPath = path.resolve(__dirname, 'src/data/deputies.json');
    const dataDir = path.dirname(outputPath);

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
    console.log(`Successfully saved ${results.length} deputies to ${outputPath}`);
}

fetchDeputies().catch(console.error);
