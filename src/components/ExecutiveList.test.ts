import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ExecutiveList } from './ExecutiveList';
import { Modal } from './Modal';
import executiveData from '../data/executive.json';

// Mock Modal
const modalMock = {
    open: vi.fn(),
    render: vi.fn(),
    attachEvents: vi.fn(),
    onClose: () => { }
} as unknown as Modal;

describe('ExecutiveList', () => {
    let executiveList: ExecutiveList;

    beforeEach(() => {
        executiveList = new ExecutiveList(modalMock);
        vi.clearAllMocks();
    });

    it('should render the governor section correctly', () => {
        const html = executiveList.render();
        expect(html).toContain('Tarcísio de Freitas');
        expect(html).toContain('MOBILIZAR GOVERNO');
        expect(html).toContain('Apoie quem tem a caneta');
    });

    it('should render all secretaries', () => {
        const html = executiveList.render();

        // Simple check: specific names should be present
        expect(html).toContain('Samuel Kinoshita'); // Nucleo
        expect(html).toContain('Gilberto Kassab');  // Nucleo
        expect(html).toContain('Jorge Lima');       // Apoio
    });

    it('should send email to individual when sendEmail is called', () => {
        const testEmail = 'test@example.com';
        executiveList.sendEmail(testEmail);

        expect(modalMock.open).toHaveBeenCalledTimes(1);
        expect(modalMock.open).toHaveBeenCalledWith(
            [testEmail],
            expect.stringContaining('Excelentíssimo(a)')
        );
    });

    it('should send email to ALL contacts when sendEmailAll is called', () => {
        executiveList.sendEmailAll();

        const expectedEmails = [
            executiveData.governador_sp.gabinete.contato_geral.email_institucional,
            ...executiveData.projeto_lei_ipva.nucleo_decisorio.map(m => m.contatos.email),
            ...executiveData.projeto_lei_ipva.apoio_estrategico.map(m => m.contatos.email)
        ];

        // Access the first call arguments
        expect(modalMock.open).toHaveBeenCalledTimes(1);
        const args = (modalMock.open as any).mock.calls[0];
        const recipients = args[0];
        const message = args[1];

        // Check if all expected emails are in the recipients list (deduplicated)
        const uniqueExpected = [...new Set(expectedEmails)];
        uniqueExpected.forEach(email => {
            expect(recipients).toContain(email);
        });

        expect(recipients.length).toBeGreaterThanOrEqual(uniqueExpected.length);
        expect(message).toContain('Solicito atenção especial ao projeto de redução do IPVA');
    });

    it('should attach instance to window for global access', () => {
        executiveList.attachEvents();
        expect((window as any).executiveList).toBe(executiveList);
    });
});
