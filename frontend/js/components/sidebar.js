import { BARCODE_TYPES, LABEL_OPTIONS } from '../constants/barcodeTypes.js';

export class SidebarComponent {
    constructor(containerId, onSelectCallback) {
        this.container = document.getElementById(containerId);
        this.onSelect = onSelectCallback;
        this.activeSelection = null;
    }

    render() {
        this.container.innerHTML = `
            <div class="sidebar-menu">
                <h3>Label Modes</h3>
                <ul class="menu-group">
                    <li class="menu-item active" data-mode="${LABEL_OPTIONS.BARCODE}">Barcode Labels</li>
                    <li class="menu-item" data-mode="${LABEL_OPTIONS.NO_BARCODE}">No Barcode Labels</li>
                </ul>
                
                <h3>Barcode Formats</h3>
                <ul class="menu-group" id="barcode-sub-menu">
                    ${Object.values(BARCODE_TYPES).map(type => `
                        <li class="sub-menu-item" data-type="type.id">{type.name}</li>
                    `).join('')}
                </ul>
            </div>
        `;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.container.querySelectorAll('.sub-menu-item, .menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.container.querySelectorAll('.sub-menu-item, .menu-item').forEach(el => el.classList.remove('active'));
                e.target.classList.add('active');
                
                const selection = e.target.dataset.type || e.target.dataset.mode;
                this.onSelect(selection);
            });
        });
    }
}