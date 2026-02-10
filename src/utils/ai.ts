
export interface AnalysisResult {
    category: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    confidence: number;
}

export const analyzeComplaint = (text: string): AnalysisResult => {
    const lowerText = text.toLowerCase();

    // Rule-based classification
    let category = 'General';
    let priority: AnalysisResult['priority'] = 'Low';

    if (lowerText.includes('power') || lowerText.includes('light') || lowerText.includes('bill') || lowerText.includes('voltage')) {
        category = 'Electricity';
    } else if (lowerText.includes('water') || lowerText.includes('leak') || lowerText.includes('tap') || lowerText.includes('dirty')) {
        category = 'Water';
    } else if (lowerText.includes('garbage') || lowerText.includes('waste') || lowerText.includes('clean')) {
        category = 'Sanitation';
    } else if (lowerText.includes('pothole') || lowerText.includes('road')) {
        category = 'Roads';
    }

    // Priority detection
    if (lowerText.includes('urgent') || lowerText.includes('emergency') || lowerText.includes('danger') || lowerText.includes('spark') || lowerText.includes('fire')) {
        priority = 'Critical';
    } else if (lowerText.includes('school') || lowerText.includes('hospital') || lowerText.includes('blocked')) {
        priority = 'High';
    } else if (lowerText.includes('delay') || lowerText.includes('not working')) {
        priority = 'Medium';
    }

    return {
        category,
        priority,
        confidence: 0.85 + Math.random() * 0.1 // Mock confidence
    };
};
