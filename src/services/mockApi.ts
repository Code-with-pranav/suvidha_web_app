export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    login: async (method: 'mobile' | 'face', credentials: any) => {
        await delay(1500);
        return { success: true, user: { id: 'u1', name: 'Ravi Kumar', role: 'citizen' } };
    },

    fetchBill: async (id: string) => {
        await delay(1000);
        // Simulate bill details
        return {
            billId: id,
            amount: 2450.00,
            dueDate: '2026-02-15',
            provider: 'UHBVN Electricity',
            consumerName: 'Ravi Kumar',
            address: 'Sector 4, Panchkula'
        };
    },

    fetchComplaints: async () => {
        await delay(800);
        return [
            { id: 'CMP-1001', service: 'Street Light', status: 'Pending', date: '2026-02-01' },
            { id: 'CMP-9022', service: 'Water Supply', status: 'Resolved', date: '2026-01-20' },
        ]
    },

    submitComplaint: async (data: any) => {
        await delay(2000);
        return { ticketId: 'CMP-' + Math.floor(Math.random() * 10000) };
    }
};
