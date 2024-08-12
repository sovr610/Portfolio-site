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
                const template = doc.querySelector('template');
                const script = doc.querySelector('script');

                if (template) {
                    document.body.appendChild(template);
                }

                if (script) {
                    // Create a new script element
                    const newScript = document.createElement('script');
                    newScript.textContent = `
                        (function() {
                            ${script.textContent}
                            const className = '${name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')}';
                            if (window[className] && !customElements.get('${name}')) {
                                customElements.define('${name}', window[className]);
                            } else {
                                console.error('Failed to define custom element: ${name}');
                            }
                        })();
                    `;
                    // Append and execute the script
                    document.head.appendChild(newScript);
                } else {
                    // Fallback for components without script
                    customElements.define(name, class extends HTMLElement {
                        constructor() {
                            super();
                            this.attachShadow({ mode: 'open' });
                            this.shadowRoot.appendChild(template.content.cloneNode(true));
                        }
                    });
                }

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