import fs from 'fs';
import path from 'path';

async function checkImages() {
    console.log('Verifying first 5 image URLs...');

    const jsonPath = path.join(process.cwd(), 'src/data/deputies.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // @ts-ignore
    const deputies = data.deputies.slice(0, 5);

    for (const dep of deputies) {
        if (!dep.photo) {
            console.log(`[SKIP] ${dep.name} has no photo.`);
            continue;
        }

        try {
            // @ts-ignore
            const response = await fetch(dep.photo, { method: 'HEAD' });
            console.log(`[${response.status}] ${dep.name}: ${dep.photo}`);
            if (!response.ok) {
                // @ts-ignore
                const getRes = await fetch(dep.photo);
                console.log(`   -> RETRY GET: ${getRes.status}`);
            }
        } catch (error: any) {
            console.error(`[ERROR] ${dep.name}: ${error.message}`);
        }
    }
}

checkImages();
