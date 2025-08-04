export class LocalStorage {
  private static isLocalStorageAvailable(): boolean {
    return (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    );
  }

  public static get<T>(name: string): T | null {
    if (!this.isLocalStorageAvailable()) return null;

    const data = localStorage.getItem(name);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error parsing localStorage item "${name}":`, error);
      return null;
    }
  }

  public static set(name: string, data: any): void {
    if (!this.isLocalStorageAvailable()) return;

    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(name, jsonData);
    } catch (error) {
      console.error(
        `Error stringifying data for localStorage item "${name}":`,
        error
      );
    }
  }

  public static remove(name: string): void {
    if (!this.isLocalStorageAvailable()) return;

    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error(`Error removing localStorage item "${name}":`, error);
    }
  }

  public static clear(): void {
    if (!this.isLocalStorageAvailable()) return;

    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}
