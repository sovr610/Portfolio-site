class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
        this.components = [];
        this.onLoadCallback = null;
    }

    addComponent(name, url) {
        this.components.push({ name, url });
    }

    addComponents(componentsArray) {
        this.components.push(...componentsArray);
    }

    setOnLoadCallback(callback) {
        if (typeof callback === 'function') {
            this.onLoadCallback = callback;
        } else {
            console.error('setOnLoadCallback expects a function as an argument');
        }
    }

    loadComponent(name, url) {
        if (this.loadedComponents.has(name)) {
            return Promise.resolve();  // Component already loaded
        }

        return fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const scripts = doc.querySelectorAll('script');
                const styles = doc.querySelectorAll('style');

                // Create a new custom element
                customElements.define(name, class extends HTMLElement {
                    constructor() {
                        super();
                        this.attachShadow({ mode: 'open' });

                        // Clone all child nodes of the body, except scripts
                        doc.body.childNodes.forEach(node => {
                            if (node.nodeName !== 'SCRIPT' && (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE)) {
                                this.shadowRoot.appendChild(node.cloneNode(true));
                            }
                        });

                        // Append styles
                        styles.forEach(style => {
                            this.shadowRoot.appendChild(style.cloneNode(true));
                        });

                        // Execute scripts in the context of the shadow DOM
                        scripts.forEach(script => {
                            const scriptContent = script.textContent;
                            const newScript = document.createElement('script');
                            newScript.textContent = `
                                (function() {
                                    const customElement = this;
                                    ${scriptContent}
                                }).call(this);
                            `;
                            this.shadowRoot.appendChild(newScript);
                        });
                    }
                });

                this.loadedComponents.add(name);
            })
            .catch(error => console.error(`Error loading component ${name}:`, error));
    }

    loadAllComponents() {
        const loadPromises = this.components.map(component =>
            this.loadComponent(component.name, component.url)
        );
        return Promise.all(loadPromises)
            .then(() => {
                console.log('All components loaded');
                document.dispatchEvent(new Event('ComponentsLoaded'));
                if (this.onLoadCallback) {
                    this.onLoadCallback();
                }
            })
            .catch(error => console.error('Error loading components:', error));
    }

    loadAdditionalComponents(componentsArray, callback) {
        const loadPromises = componentsArray.map(component =>
            this.loadComponent(component.name, component.url)
        );
        return Promise.all(loadPromises)
            .then(() => {
                console.log('Additional components loaded');
                document.dispatchEvent(new Event('AdditionalComponentsLoaded'));
                if (callback && typeof callback === 'function') {
                    callback();
                }
            })
            .catch(error => console.error('Error loading additional components:', error));
    }
}