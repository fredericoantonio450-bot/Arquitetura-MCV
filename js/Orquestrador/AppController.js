/* # Controla o fluxo geral e rotas */

/* Este código intercepta os cliques em links e muda de página sem recarregar o navegador (Comportamento SPA)  */
import HomeView from "../views/HomeView.js";
import DashboardView from "../views/DashboardView.js";

export default class AppController {
    constructor() {
        this.routes = [
            { path: "/", view: HomeView },
            { path: "/dashboard", view: DashboardView }
        ];
    }

    init() {
        // Escuta os botões de voltar/avançar do navegador
        window.addEventListener("popstate", () => this.router());

        // Escuta cliques em links com atributo 'data-link'
        document.body.addEventListener("click", e => {
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });

        this.router();
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.router();
    }

    async router() {
        // Testa se a rota atual coincide com as rotas configuradas
        let match = this.routes.find(route => location.pathname === route.path);

        // Rota padrão caso não encontre (404 vira Home)
        if (!match) {
            match = this.routes[0];
        }

        // Instancia a View correta
        const view = new match.view();

        // Injeta o HTML na div #app
        document.querySelector("#app").innerHTML = await view.getHtml();
        
        // Executa scripts visuais daquela tela
        await view.afterRender();
    }
}