
async function loadTemplateContent(templateName) {

    const response = await fetch(`html_templates/${templateName}.html`); 
    const html = await response.text();
    const parser = new DOMParser;
    const HTMLdoc = parser.parseFromString(html, "text/html");
    const template = HTMLdoc.querySelector("template");

    const templateContent = document.importNode(template.content, true);
    
    return templateContent;

}



export { loadTemplateContent }