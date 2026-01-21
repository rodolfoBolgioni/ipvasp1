export class AnalyticsService {
    trackEvent(eventName: string, params: Record<string, any>) {
        if (typeof window !== 'undefined' && 'gtag' in window) {
            // @ts-ignore
            window.gtag('event', eventName, params);
        }
    }

    async trackCounterAction(action: 'emails' | 'visits') {
        const url = `https://api.counterapi.dev/v1/ipva1sp.com.br/${action}/up/`;
        try {
            await fetch(url, { mode: 'no-cors' });
        } catch (err) {
            console.error(`Failed to track ${action}`, err);
        }
    }
}
