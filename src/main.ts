import './style.css';
import { Header } from './components/Header';
import { CalculatorUI } from './components/CalculatorUI';
import { PlanSection } from './components/PlanSection';
import { DeputiesList } from './components/DeputiesList';
import { ExecutiveList } from './components/ExecutiveList';
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
    const impact = new ImpactSection();
    const footer = new Footer();

    // Instantiate Executive List
    const executiveList = new ExecutiveList(modal);

    // Render Layout
    app.innerHTML = `
        ${header.render()}
        <main>
            ${calculator.render()}
            ${plan.render()} <!-- Restored Video+PDF -->
            
            <!-- Executive Section -->
            <!-- Executive List Hidden for Validation -->

            ${deputiesList.render()}
            ${impact.render()}
        </main>
        ${footer.render()}
        ${modal.render()}
    `;

    // Hydrate (Attach Events)
    calculator.attachEvents();
    // executiveList.attachEvents();
    deputiesList.attachEvents();

    // Wire up events
    modal.onClose = () => impact.refresh();
    modal.attachEvents();

    impact.init();
});
