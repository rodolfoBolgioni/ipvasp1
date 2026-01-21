import './style.css';
import { Header } from './components/Header';
import { CalculatorUI } from './components/CalculatorUI';
import { PlanSection } from './components/PlanSection';
import { DeputiesList } from './components/DeputiesList';
import { ImpactSection } from './components/ImpactSection';
import { Modal } from './components/Modal';
import { Footer } from './components/Footer';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (!app) return;

    // Components
    const header = new Header();
    const calculator = new CalculatorUI();
    const plan = new PlanSection();
    const modal = new Modal();
    const deputiesList = new DeputiesList(modal);
    // ImpactSection seems to duplicate "Nosso Impacto". 
    // The original code had Counters in "Nosso Impacto" section at the end.
    // The previous ImpactSection was fine.
    const impact = new ImpactSection();
    const footer = new Footer();

    // Render Layout
    app.innerHTML = `
        ${header.render()}
        <main>
            ${calculator.render()}
            ${plan.render()} <!-- Restored Video+PDF -->
            ${deputiesList.render()}
            ${impact.render()}
        </main>
        ${footer.render()}
        ${modal.render()}
    `;

    // Hydrate (Attach Events)
    calculator.attachEvents();
    deputiesList.attachEvents();

    // Wire up events
    modal.onClose = () => impact.refresh();
    modal.attachEvents();

    impact.init();
});
