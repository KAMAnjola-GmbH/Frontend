/**
 * Common types shared across the application.
 */

/**
 * Notification types for toast messages.
 */
export type NotificationType = 'success' | 'error' | 'info';

/**
 * Notification data structure.
 */
export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}
