import { v4 as uuidv4 } from 'uuid';

/**
 * Returns an anonymous user ID, creating one if it doesn't exist
 * @returns The anonymous user ID
 */
export default function getOrCreateAnonymousId(): string {
  let id: string | null = localStorage.getItem('anonId');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('anonId', id);
  }
  return id;
}
