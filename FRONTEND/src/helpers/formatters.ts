export function formatCurrency(value: number | string) {
    return Intl.NumberFormat("es-CO", { style: 'currency', currency: "COP", minimumFractionDigits: 0 }).format(value as number)
}

export function formatDate(value: string) {
    const raw = value;
    const iso = raw.replace(" ", "T").slice(0, 23) + "Z";
    const date = new Date(iso);

    return new Intl.DateTimeFormat("es-CO", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}
