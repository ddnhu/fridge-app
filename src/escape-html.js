// For putting user-typed food names into HTML strings safely
export const escapeHTML = s => s.replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
