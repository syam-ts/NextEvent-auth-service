export const identifyRole = (role: string) => {
    if (role === "organizer") {
        return "organizer";
    } else if (role === "guest") {
        return "guest";
    } else {
        throw new Error("wrong role");
    }
};