import { Deputy } from '../core/types';

const INITIAL_DEPUTIES: Deputy[] = [
    { name: "Agente Federal Danilo Balas", party: "PL", room: "255", phone: "3886-6054/6052", email: "apfdanilobalas@al.sp.gov.br" },
    { name: "Alex Madureira", party: "PL", room: "173", phone: "(11) 3886-6676/ 6677", email: "alexdemadureira@al.sp.gov.br" },
    { name: "Altair Moraes", party: "REPUBLICANOS", room: "T. 53", phone: "(11) 3886-6468/ 6476", email: "altairmoraes@al.sp.gov.br" },
    { name: "Ana Carolina Serra", party: "CIDADANIA", room: "T44", phone: "(11) 3886-6066/ 6067", email: "acrbserra@al.sp.gov.br" },
    { name: "Ana Perugini", party: "PT", room: "T49", phone: "(11) 3886-6082/ 6083", email: "anaperugini@al.sp.gov.br" },
    { name: "Analice Fernandes", party: "PSDB", room: "261", phone: "(11) 3886-6797/ 6798", email: "afernandes@al.sp.gov.br" },
    { name: "André Bueno", party: "PL", room: "358", phone: "(11) 3886-6526 / 6527", email: "andre.bueno@al.sp.gov.br" },
    { name: "André do Prado", party: "PL", room: "346", phone: "(11) 3886-6562/ 6563", email: "andredoprado@al.sp.gov.br" },
    { name: "Andréa Werner", party: "PSB", room: "T45", phone: "(11) 3886-6088/ 6089", email: "andreawerner@al.sp.gov.br" },
    { name: "Atila Jacomussi", party: "UNIÃO", room: "168", phone: "(11) 3886-6090/ 6091", email: "atilajacomussi@al.sp.gov.br" },
    { name: "Barros Munhoz", party: "PSDB", room: "208", phone: "(11) 3886-6635/ 6665", email: "barrosmunhoz@al.sp.gov.br" },
    { name: "Beth Sahão", party: "PT", room: "313", phone: "(11) 3886-6643/ 6657", email: "bsahao@al.sp.gov.br" },
    { name: "Bruna Furlan", party: "PSDB", room: "352", phone: "(11) 3886-6098/ 6099", email: "brunafurlan@al.sp.gov.br" },
    { name: "Bruno Zambelli", party: "PL", room: "347", phone: "(11) 3886-6860/ 6862", email: "brunozambelli@al.sp.gov.br" },
    { name: "Caio França", party: "PSB", room: "108", phone: "(11) 3886-6572/ 6577", email: "caiofranca@al.sp.gov.br" },
    { name: "Capitão Telhada", party: "PP", room: "305", phone: "(11) 3886-6281/ 6283", email: "capitaotelhada@al.sp.gov.br" },
    { name: "Carla Morando", party: "PSDB", room: "411", phone: "(11) 3886-6110 / 6111", email: "carlamorando@al.sp.gov.br" },
    { name: "Carlão Pignatari", party: "PSDB", room: "148", phone: "(11) 3886-6123/ 6124", email: "carlaopignatari@al.sp.gov.br" },
    { name: "Carlos Giannazi", party: "PSOL", room: "112", phone: "(11) 3886-6686/ 6690", email: "cgiannazi@al.sp.gov.br" },
    { name: "Clarice Ganem", party: "PODE", room: "162", phone: "(11) 3886-6093/ 6094", email: "clariceganem@al.sp.gov.br" },
    { name: "Conte Lopes", party: "PL", room: "156", phone: "(11) 3886-6464 / 6465", email: "clopes@al.sp.gov.br" },
    { name: "Dani Alonso", party: "PL", room: "110", phone: "(11) 3886-6108/ 6109", email: "danialonso@al.sp.gov.br" },
    { name: "Daniel Soares", party: "UNIÃO", room: "203", phone: "(11) 3886-6235/ 6236", email: "DanielSoares@al.sp.gov.br" },
    { name: "Danilo Campetti", party: "REPUBLICANOS", room: "164", phone: "(11) 3886-6772/ 6773", email: "danilocampetti@al.sp.gov.br" },
    { name: "Delegada Graciela", party: "PL", room: "T-50", phone: "(11) 3886-6276/ 6279", email: "delegadagraciela@al.sp.gov.br" },
    { name: "Delegado Olim", party: "PP", room: "105", phone: "(11) 3886-6536/ 6543", email: "deputado.delegadoolim@al.sp.gov.br" },
    { name: "Dirceu Dalben", party: "CIDADANIA", room: "T.02", phone: "(11) 3886-6737/ 6763", email: "dirceudalben@al.sp.gov.br" },
    { name: "Donato", party: "PT", room: "169", phone: "(11) 3886-6219/ 6220", email: "donato@al.sp.gov.br" },
    { name: "Dr. Eduardo Nóbrega", party: "PODE", room: "T41", phone: "(11) 3886-6242", email: "dreduardonobrega@al.sp.gov.br" },
    { name: "Dr. Elton", party: "UNIÃO", room: "170", phone: "(11) 3886-6384/ 6385", email: "drelton@al.sp.gov.br" },
    { name: "Dr. Jorge do Carmo", party: "PT", room: "T-47", phone: "(11) 3886-6517/ 6518", email: "drdepjorgedocarmo@al.sp.gov.br" },
    { name: "Ediane Maria", party: "PSOL", room: "254", phone: "(11) 3886-6395/ 6397", email: "edianemaria@al.sp.gov.br" },
    { name: "Edna Macedo", party: "REPUBLICANOS", room: "T54", phone: "(11) 3886-6432/ 6435", email: "ednamacedo@al.sp.gov.br" },
    { name: "Edson Giriboni", party: "UNIÃO", room: "251", phone: "(11) 3886-6555 / 6556", email: "egiriboni@al.sp.gov.br" },
    { name: "Eduardo Suplicy", party: "PT", room: "M06", phone: "(11) 3886-6406/ 6407", email: "eduardosuplicy@al.sp.gov.br" },
    { name: "Emídio de Souza", party: "PT", room: "T.10", phone: "(11) 3886-6420/ 6418", email: "emidio@al.sp.gov.br" },
    { name: "Enio Tatto", party: "PT", room: "01", phone: "(11) 3886-6950/ 6944", email: "eniotatto@al.sp.gov.br" },
    { name: "Fabiana Bolsonaro", party: "PL", room: "257", phone: "(11) 3886-6504/ 6505", email: "fabianab@al.sp.gov.br" },
    { name: "Fábio Faria de Sá", party: "PODE", room: "T40", phone: "(11) 3886-6541/ 6542", email: "fabiofariadesa@al.sp.gov.br" },
    { name: "Felipe Franco", party: "UNIÃO", room: "165", phone: "(11) 3886-6506/ 6507", email: "felipefranco@al.sp.gov.br" },
    { name: "Gil Diniz Bolsonaro", party: "PL", room: "401", phone: "(11) 3886-6313/ 6321", email: "gildiniz@al.sp.gov.br" },
    { name: "Gilmaci Santos", party: "REPUBLICANOS", room: "T38", phone: "(11) 3886-6560/ 7752", email: "gilmacisantos@al.sp.gov.br" },
    { name: "Guilherme Cortez", party: "PSOL", room: "252", phone: "(11) 3886-6882/ 6883", email: "guilhermecortez@al.sp.gov.br" },
    { name: "Guto Zacarias", party: "UNIÃO", room: "356", phone: "(11) 3886-6578/ 6579", email: "gutozacarias@al.sp.gov.br" },
    { name: "Itamar Borges", party: "MDB", room: "311", phone: "(11) 3886-6852/ 6857", email: "itamarborges@al.sp.gov.br" },
    { name: "Jorge Caruso", party: "MDB", room: "T.11", phone: "(11) 3886-6736/ 6765", email: "jcaruso@al.sp.gov.br" },
    { name: "Jorge Wilson Xerife do Consumidor", party: "REPUBLICANOS", room: "T.08 - Térreo", phone: "(11) 3886-6485/ 6487", email: "jorgewilsonxerifedoconsumidor@al.sp.gov.br" },
    { name: "Leci Brandão", party: "PCdoB", room: "308", phone: "(11) 3886-6790/ 6794", email: "lecibrandao@al.sp.gov.br" },
    { name: "Léo Oliveira", party: "MDB", room: "359", phone: "(11) 3886-6386/ 6387", email: "leooliveira@al.sp.gov.br" },
    { name: "Leonardo Siqueira", party: "NOVO", room: "355", phone: "(11) 3886-6615/ 6616", email: "leosiqueira@al.sp.gov.br", site: "https://leonardosiqueirabr.com.br/" },
    { name: "Letícia Aguiar", party: "PL", room: "157", phone: "(11) 3886-6227/ 6228", email: "leticiaaguiar@al.sp.gov.br" },
    { name: "Lucas Bove", party: "PL", room: "207", phone: "(11) 3886-6632/ 6634", email: "lucasbove@al.sp.gov.br" },
    { name: "Luiz Claudio Marcolino", party: "PT", room: "167", phone: "(11) 3886-6650/ 6652", email: "lcmarcolino@al.sp.gov.br" },
    { name: "Luiz Fernando T. Ferreira", party: "PT", room: "107", phone: "(11) 3886-6666/ 6613", email: "lfernando@al.sp.gov.br" },
    { name: "Major Mecca", party: "PL", room: "T-07", phone: "(11) 3886-6177/ 6178", email: "majormecca@al.sp.gov.br" },
    { name: "Marcelo Aguiar", party: "PODE", room: "163", phone: "(11) 3886-6155/ 6156", email: "marceloaguiar@al.sp.gov.br" },
    { name: "Márcia Lia", party: "PT", room: "304", phone: "(11) 3886-6104/ 6614", email: "marcialia@al.sp.gov.br" },
    { name: "Marcio Nakashima", party: "PDT", room: "205", phone: "(11) 3886-6633/ 6596", email: "MarcioNakashima@al.sp.gov.br" },
    { name: "Marcos Damasio", party: "PL", room: "172", phone: "(11) 3886-6704 / 6705", email: "marcosdamasio@al.sp.gov.br" },
    { name: "Maria Lúcia Amary", party: "PSDB", room: "309", phone: "(11) 3886-6840/ 6855", email: "mlamary@al.sp.gov.br" },
    { name: "Marina Helou", party: "REDE", room: "259", phone: "(11)3886-6084 / 6078", email: "marinahelou@al.sp.gov.br" },
    { name: "Marta Costa", party: "PSD", room: "210", phone: "(11)3886-6621 / 6624", email: "depmartacosta@al.sp.gov.br" },
    { name: "Maurici", party: "PT", room: "211", phone: "(11) 3886-6753", email: "depmaurici@al.sp.gov.br" },
    { name: "Mauro Bragato", party: "PSDB", room: "204", phone: "(11)3886-6400 / 6417", email: "Mbragato@al.sp.gov.br" },
    { name: "Milton Leite Filho", party: "UNIÃO", room: "106", phone: "(11)3886-6550 / 6551", email: "mleite@al.sp.gov.br" },
    { name: "Monica Seixas do Movimento Pretas", party: "PSOL", room: "T03", phone: "(11)3886-6639 / 6640", email: "movimentopretas@al.sp.gov.br" },
    { name: "Ortiz Junior", party: "CIDADANIA", room: "404", phone: "(11) 3886-6552/6553", email: "ortizjunior@al.sp.gov.br" },
    { name: "Oseias de Madureira", party: "PSD", room: "T39", phone: "(11) 3886-6423/ 6424", email: "oseiasdemadureira@al.sp.gov.br" },
    { name: "Paula da Bancada Feminista", party: "PSOL", room: "256", phone: "(11) 3886-6687/ 6688", email: "pauladabancadafeminista@al.sp.gov.br" },
    { name: "Paulo Correa Jr", party: "PSD", room: "206", phone: "(11)3886-6372 / 6377", email: "paulocorreajr@al.sp.gov.br" },
    { name: "Paulo Fiorilo", party: "PT", room: "T. 04", phone: "(11)3886-6663/6667", email: "paulofiorilo@al.sp.gov.br" },
    { name: "Paulo Mansur", party: "PL", room: "360", phone: "(11) 3886-6921/ 6922", email: "paulomansur@al.sp.gov.br" },
    { name: "Profª Camila Godoi", party: "PSB", room: "357", phone: "(11) 3886-6830 / 6831", email: "profacamilagodoi@al.sp.gov.br" },
    { name: "Professora Bebel", party: "PT", room: "166", phone: "(011)3886-6645 / 6648", email: "professorabebel@al.sp.gov.br" },
    { name: "Rafa Zimbaldi", party: "UNIÃO", room: "260", phone: "(11)3886-6198 / 6201", email: "rafazimbaldi@al.sp.gov.br" },
    { name: "Rafael Saraiva", party: "UNIÃO", room: "T48", phone: "(11) 3886-6740/ 6741", email: "rafaelsaraiva@al.sp.gov.br" },
    { name: "Rafael Silva", party: "PSD", room: "161", phone: "(011)3886-6788 / 6792", email: "rsilva@al.sp.gov.br" },
    { name: "Reis", party: "PT", room: "T51", phone: "(11) 3886-6743/ 6744", email: "deputadoreis@al.sp.gov.br" },
    { name: "Ricardo França", party: "PODE", room: "361", phone: "(11) 3886-6748", email: "ricardofranca@al.sp.gov.br" },
    { name: "Ricardo Madalena", party: "PL", room: "104", phone: "(011)3886-6403 / 6404", email: "ricardomadalena@al.sp.gov.br" },
    { name: "Rodrigo Moraes", party: "PL", room: "307", phone: "(011)3886-6055 / 6056", email: "deputadorodrigomoraes@al.sp.gov.br" },
    { name: "Rogério Nogueira", party: "PSDB", room: "246", phone: "(011) 3886-6842 / 6853", email: "rnogueira@al.sp.gov.br" },
    { name: "Rogério Santos", party: "MDB", room: "T46", phone: "(11) 3886-6499/ 6878", email: "rogeriosantos@al.sp.gov.br" },
    { name: "Rômulo Fernandes", party: "PT", room: "306", phone: "(11) 3886-6760/ 6761", email: "romulofernandes@al.sp.gov.br" },
    { name: "Sebastião Santos", party: "REPUBLICANOS", room: "111", phone: "(011) 3886-6474 / 6475", email: "sebastiaosantos@al.sp.gov.br" },
    { name: "Solange Freitas", party: "UNIÃO", room: "253", phone: "(11) 3886-6834/ 6835", email: "solangefreitas@al.sp.gov.br" },
    { name: "Tenente Coimbra", party: "PL", room: "258", phone: "(11)3886-6776 / 6777", email: "tenentecoimbra@al.sp.gov.br" },
    { name: "Teonilio Barba", party: "PT", room: "103", phone: "3886-6495/6493/6233/6232/6617", email: "teoniliobarba@al.sp.gov.br" },
    { name: "Thainara Faria", party: "PT", room: "T52", phone: "(11) 3886-6850/ 6851", email: "thainarafaria@al.sp.gov.br" },
    { name: "Thiago Auricchio", party: "PL", room: "353", phone: "(011)3886-6214 / 6216", email: "ThiagoAuricchio@al.sp.gov.br" },
    { name: "Tomé Abduch", party: "REPUBLICANOS", room: "354", phone: "(11) 3886-6867/ 6868", email: "tomeabduch@al.sp.gov.br" },
    { name: "Valdomiro Lopes", party: "PSB", room: "T05", phone: "3886-6251/6252", email: "vlopes@al.sp.gov.br" },
    { name: "Valeria Bolsonaro", party: "PL", room: "T. 06", phone: "(011)3886-6222 / 6223", email: "ValeriaBolsonaro@al.sp.gov.br" },
    { name: "Vitão do Cachorrão", party: "REPUBLICANOS", room: "T55", phone: "(11) 3886-6864/ 6865", email: "vitaodocachorrao@al.sp.gov.br" },
];

export class DeputyService {
    private deputies: Deputy[];

    constructor(initialData: Deputy[] = INITIAL_DEPUTIES) {
        this.deputies = initialData;
        this.sortDeputies();
    }

    private sortDeputies() {
        this.deputies.sort((a, b) => a.name.localeCompare(b.name));
    }

    getAll(): Deputy[] {
        return this.deputies;
    }

    search(query: string): Deputy[] {
        const normalizedQuery = this.normalizeString(query);
        return this.deputies.filter(deputy => {
            return this.normalizeString(deputy.name).includes(normalizedQuery) ||
                this.normalizeString(deputy.party).includes(normalizedQuery);
        });
    }

    getPartyStats(): Record<string, number> {
        const stats: Record<string, number> = {};
        this.deputies.forEach(dep => {
            const party = dep.party.toUpperCase();
            stats[party] = (stats[party] || 0) + 1;
        });
        return stats;
    }

    private normalizeString(str: string): string {
        return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}
