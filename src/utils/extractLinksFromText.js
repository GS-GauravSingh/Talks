function extrackLinksFromText(inputString, incoming = false) {
    // Using Regular Expressions (Regex) to extrack links from the text.
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Array to store all the links present in the 'inputString'.
    const linksArray = [];

    const modifiedString = inputString.replace(urlRegex, (url) => {
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        linksArray.push(url);

        const textColor = incoming ? "text-primary" : "text-white";
        return `<span class="${textColor} underline underline-offset-2"><a href="${url}" target="_blank">${domain}</a></span>`;
    });

    
    return {
        originalString: modifiedString,
        links: linksArray,
    };
}

export default extrackLinksFromText;
