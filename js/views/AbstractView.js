/**# Classe base para todas as views */

/* Todas as suas telas/views vão herdar desta classe para garantir que tenham o mesmo comportamento.  */
export default class AbstractView { // Estar export default class AbstractView { // Estar exportando a classe para que outras classes possam herdar dela
    constructor(params) {
        this.params = params;
    }

    // Define o título da aba do navegador
    setTitle(title) {
        document.title = title;
    }

    // Retorna o HTML estrutural da página (sofre override nas subclasses)
    async getHtml() {
        return "";
    }

    // Executa lógicas após o HTML ser injetado (ex: ligar escutadores de eventos)
    async afterRender() {
        return;
    }
}