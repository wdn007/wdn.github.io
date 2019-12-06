// Web Component JavaScript of the Styling Panel
(function()  {
    let template = document.createElement("template");
    template.innerHTML = `
        <form id="form">
            <fieldset>
                <legend>Box Properties</legend>
                <table>
                    <tr>
                        <td>Color</td>
                        <td><input id="sps_color" type="text" size="40"
maxlength="40"></td>
                    </tr>
</table>
                <input type="submit">
            </fieldset>
</form> `;
    class BoxSps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        color: this.color
                    }
                }
            }));
        }
        setcolor(newColor) {
            this._shadowRoot.getElementById("sps_color").value = newColor;
        }
        getcolor() {
            return this._shadowRoot.getElementById("sps_color").value;
        }
    }
    customElements.define("com-sample-box-sps", BoxSps);
})();
