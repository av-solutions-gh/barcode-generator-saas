export class WorkspaceComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentView = 'single'; // Options: 'single' or 'bulk'
    }

    render(activeTarget = 'code128') {
        this.container.innerHTML = `
            <div class="workspace-card">
                <div class="workspace-tabs">
                    <button class="tab-btn ${this.currentView === 'single' ? 'active' : ''}" id="tab-single">Single Barcode</button>
                    <button class="tab-btn ${this.currentView === 'bulk' ? 'active' : ''}" id="tab-bulk">Bulk Import / Copy-Paste</button>
                </div>

                <div class="workspace-body">
                    <div class="active-format-banner">Active Configuration: <strong>${activeTarget.toUpperCase()}</strong></div>
                    
                    <div id="workspace-form-render">
                        ${this.currentView === 'single' ? this.getSingleTemplate() : this.getBulkTemplate()}
                    </div>
                </div>
            </div>
        `;
        this.setupEventListeners(activeTarget);
    }

    getSingleTemplate() {
        return `
            <div class="form-group">
                <label for="single-barcode-input">Barcode Value</label>
                <input type="text" id="single-barcode-input" placeholder="Enter barcode number or text data...">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="single-header-input">Header (Code/Name)</label>
                    <input type="text" id="single-header-input" placeholder="Top label text...">
                </div>
                <div class="form-group">
                    <label for="single-footer-input">Footer</label>
                    <input type="text" id="single-footer-input" placeholder="Bottom label text...">
                </div>
            </div>
            <button class="primary-btn" id="generate-single-btn">Generate Single Label</button>
        `;
    }

    getBulkTemplate() {
        return `
            <div class="bulk-container">
                <div class="form-group">
                    <label for="bulk-paste-input">Copy & Paste Data (Columns: Barcode, Header, Footer)</label>
                    <textarea id="bulk-paste-input" rows="8" placeholder="Format example (tab or comma separated):\n12345678\tItem Alpha\tFooter Info\n87654321\tItem Beta\tFooter Info"></textarea>
                </div>
                
                <div class="file-upload-zone" id="drop-zone">
                    <p>Or drag and drop an Excel file (.xlsx, .xls) here, or <span class="browse-link">browse files</span></p>
                    <input type="file" id="excel-file-input" accept=".xlsx, .xls" style="display: none;">
                </div>
                
                <button class="primary-btn" id="generate-bulk-btn">Process Bulk Array</button>
            </div>
        `;
    }

    setupEventListeners(activeTarget) {
        // Tab switching mechanics
        const tabSingle = document.getElementById('tab-single');
        const tabBulk = document.getElementById('tab-bulk');

        if (tabSingle && tabBulk) {
            tabSingle.addEventListener('click', () => {
                this.currentView = 'single';
                this.render(activeTarget);
            });
            tabBulk.addEventListener('click', () => {
                this.currentView = 'bulk';
                this.render(activeTarget);
            });
        }

        // Logic routing for processing engines
        if (this.currentView === 'single') {
            document.getElementById('generate-single-btn')?.addEventListener('click', () => {
                const value = document.getElementById('single-barcode-input').value;
                console.log(`Sending target [${activeTarget}] with payload [${value}] to execution engine pipeline.`);
            });
        } else {
            const dropZone = document.getElementById('drop-zone');
            const fileInput = document.getElementById('excel-file-input');

            dropZone?.addEventListener('click', () => fileInput.click());
            fileInput?.addEventListener('change', (e) => console.log('File array loaded:', e.target.files[0]));
        }
    }
}