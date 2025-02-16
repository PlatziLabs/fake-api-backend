/**
 * Generates a clean, SEO-friendly URL slug from a title string
 * @param title The title to convert into a slug
 * @returns A lowercase string with only letters, numbers and hyphens
 */
export function generateSlug(title: string) {
  if (!title) return '';

  return title
    // Convert to lowercase
    .toLowerCase()
    // Replace special characters with their simple equivalents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace any non-word chars (except hyphens) with spaces
    .replace(/[^\w\-]+/g, ' ')
    // Replace underscores with spaces
    .replace(/\_/g, ' ')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    // Trim spaces from start and end
    .trim()
    // Replace spaces with hyphens
    .replace(/\s/g, '-')
    // Remove consecutive hyphens
    .replace(/\-+/g, '-')
    // Remove hyphens from start and end
    .replace(/^-+|-+$/g, '');
}