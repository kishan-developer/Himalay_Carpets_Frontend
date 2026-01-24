function getCookieByName(name) {
    // Get all cookies as a single string
    const cookies = document.cookie;

    // Split cookies into individual "name=value" pairs
    const cookieArray = cookies.split("; ");

    // Find the cookie with the specified name
    const cookie = cookieArray.find((cookie) => cookie.startsWith(name + "="));

    // If the cookie is found, split it and return its value, otherwise return null
    return cookie ? cookie.split("=")[1] : null;
}

export default getCookieByName;
