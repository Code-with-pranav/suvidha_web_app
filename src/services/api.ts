
// Mock Data Types
export interface StatMetric {
    label: string;
    value: string;
    change: string; // e.g. "+5%"
    trend: 'up' | 'down' | 'neutral';
}

export interface Complaint {
    id: string;
    category: string;
    details: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    timestamp: string;
}

// Mock Database
const MOCK_STATS: StatMetric[] = [
    { label: 'Total Sessions', value: '1,245', change: '+12%', trend: 'up' },
    { label: 'Bills Paid', value: '₹4.5L', change: '+8%', trend: 'up' },
    { label: 'Open Complaints', value: '23', change: '-5%', trend: 'down' }, // down is good for complaints
];

const MOCK_COMPLAINTS: Complaint[] = [
    { id: 'C-101', category: 'Electricity', details: 'Power cut in Sector 4', status: 'Open', timestamp: '2023-10-27 10:30 AM' },
    { id: 'C-102', category: 'Water', details: 'Low pressure', status: 'In Progress', timestamp: '2023-10-26 02:15 PM' },
    { id: 'C-103', category: 'Municipal', details: 'Garbage not collected', status: 'Resolved', timestamp: '2023-10-25 09:00 AM' },
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    getDashboardStats: async (): Promise<StatMetric[]> => {
        await delay(800);
        return MOCK_STATS;
    },

    getComplaints: async (): Promise<Complaint[]> => {
        await delay(1000);
        return MOCK_COMPLAINTS;
    },

    submitComplaint: async (category: string, details: string): Promise<string> => {
        await delay(1500);
        return `TKT-${Math.floor(Math.random() * 10000)}`;
    },

    fetchBill: async (consumerId: string, type: string) => {
        await delay(1200);
        // Random mock bill
        if (consumerId.length < 5) throw new Error('Invalid ID');
        return {
            amount: Math.floor(Math.random() * 5000) + 500,
            dueDate: '2023-11-15',
            name: 'John Doe',
            address: '123, Civil Lines, City'
        };
    }
};
