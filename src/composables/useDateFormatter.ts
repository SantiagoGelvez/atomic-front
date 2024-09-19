export function useDateFormatter() {
    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        
        return date.toLocaleDateString('es-ES', options);
    };
    
    return {
        formatDate,
    };
}