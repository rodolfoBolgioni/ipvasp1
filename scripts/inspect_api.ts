const LIST_URL = 'https://legis-backend-api-portal.pub.al.sp.gov.br/api_portal/parlamentar-portal/?filtroLegislatura=20&filtroEmExercicioPesquisa=S';
const DETAIL_URL_BASE = 'https://legis-backend-api-portal.pub.al.sp.gov.br/api_portal/parlamentar-portal/detalhes/';

async function inspect() {
    console.log('Fetching list...');
    const listRes = await fetch(LIST_URL);
    const listData = await listRes.json();
    const first = listData.content[0];

    console.log('--- SUMMARY (List) ---');
    console.log('Name:', first.txNomeParlamentar);
    console.log('txFoto:', first.txFoto);

    console.log('\nFetching details...');
    const detailRes = await fetch(`${DETAIL_URL_BASE}${first.nuMatricula}`);
    const detail = await detailRes.json();

    console.log('--- DETAIL ---');
    console.log('txFotoGrande:', detail.biografia?.txFotoGrande);
    console.log('txFotoSimples:', detail.biografia?.txFotoSimples); // Checking if this exists
}

inspect();
