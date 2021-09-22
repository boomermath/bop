

export default class Util {
    public static toTitleCase(string: string): string {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    }
}