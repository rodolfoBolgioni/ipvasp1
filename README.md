# IPVA 1% SP - Movimento Apartidário de Iniciativa Popular

Este projeto é a interface digital do movimento pela redução da alíquota do IPVA em São Paulo de 4% para 1%.
O site foi refatorado para utilizar tecnologias modernas, garantindo performance, estabilidade e transparência nos dados.

## 🌟 Destaques do Projeto

- **Lógica Blindada**: 100% de Cobertura de Testes Unitários nas regras de negócio.
- **Dados Autônomos**: Script ETL que monitora a ALESP automaticamente.
- **Deploy Contínuo**: Integração via GitHub Actions com segurança total (Secrets).
- **UX Premium**: Design responsivo (Mobile-First) com TailwindCSS.

## 🚀 Arquitetura e Tecnologias

Migramos de um site estático para uma **SPA** moderna e robusta:

- **Frontend**: TypeScript, Vite, TailwindCSS.
- **Gráficos**: Chart.js (Interativos).
- **Testes**: Vitest (QA).
- **CI/CD**: GitHub Actions.

## 📂 Estrutura Inteligente (SOLID)

- **`src/services/`** *(100% Coverage)*:
  - `CalculatorService.ts`: Regras de cálculo (Economia, Markup).
  - `DeputyService.ts`: Gestão de dados e buscas otimizadas.
  - `AnalyticsService.ts`: Integração de métricas com mocks para testes.
  
- **`src/components/`**:
  - Camada visual limpa, separada da lógica.

## 🤖 Automação e Deploy

O deploy manual foi **aposentado**. O projeto se auto-gerencia:

1.  **Gatilho**: Toda segunda-feira às 08:00 (ou via Push na `master`).
2.  **Verificação**: O script `scripts/update-deputies.ts` consulta a API da ALESP.
3.  **Decisão**: Se (e somente se) houver mudança nos dados, ele atualiza o JSON.
4.  **Publicação**: Constrói o site (`npm run build`) e envia para a Locaweb via FTP seguro.

*(Consulte `AUTOMATION.md` e `GITHUB_SECRETS.md` na pasta de documentação para detalhes).*

## 🛠️ Como Rodar Localmente

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Rodar Testes (QA)
```bash
npm run test           # Roda os testes
npx vitest --coverage  # Gera relatório de cobertura
```

---
*Projeto independente pela liberdade econômica de quem produz.*
