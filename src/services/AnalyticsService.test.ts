import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnalyticsService } from './AnalyticsService';

describe('AnalyticsService', () => {
    let service: AnalyticsService;

    beforeEach(() => {
        service = new AnalyticsService();
        // Reset window.gtag
        // @ts-ignore
        window.gtag = vi.fn();
        global.fetch = vi.fn(() => Promise.resolve({ ok: true } as Response));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should track event if gtag is defined', () => {
        service.trackEvent('test_event', { foo: 'bar' });
        // @ts-ignore
        expect(window.gtag).toHaveBeenCalledWith('event', 'test_event', { foo: 'bar' });
    });

    it('should NOT throw if gtag is undefined', () => {
        // @ts-ignore
        delete window.gtag;
        expect(() => service.trackEvent('test_event', {})).not.toThrow();
    });

    it('should track counter action via fetch', async () => {
        const fetchSpy = vi.spyOn(global, 'fetch');
        await service.trackCounterAction('visits');
        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringContaining('counterapi.dev'),
            expect.objectContaining({ mode: 'no-cors' })
        );
    });

    it('should handle fetch errors gracefully', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        // Force fetch fail
        vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

        await service.trackCounterAction('emails');

        expect(consoleSpy).toHaveBeenCalled();
    });
});
