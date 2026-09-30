import { DEFAULT_VISIBILITY_SETTINGS } from '../constants/uiConfig.js';

export class SettingsComponent {
    constructor(containerId, onSettingsChangeCallback) {
        this.container = document.getElementById(containerId);
        this.onChange = onSettingsChangeCallback;
        this.currentSettings = { ...DEFAULT_VISIBILITY_SETTINGS };
    }

    render() {
        this.container.innerHTML = `
            <div class="settings-card">
                <h3>Visibility Settings</h3>
                <p class="settings-subtitle">Toggle barcode label components visibility:</p>
                
                <div class="settings-options-list">
                    <label class="checkbox-container">
                        <input type="checkbox" id="setting-show-header" ${this.currentSettings.showHeader ? 'checked' : ''}>
                        <span class="checkmark"></span> Show Label Header
                    </label>

                    <label class="checkbox-container">
                        <input type="checkbox" id="setting-show-footer" ${this.currentSettings.showFooter ? 'checked' : ''}>
                        <span class="checkmark"></span> Show Label Footer
                    </label>

                    <label class="checkbox-container">
                        <input type="checkbox" id="setting-show-text" ${this.currentSettings.showValueText ? 'checked' : ''}>
                        <span class="checkmark"></span> Show Barcode Raw Digits
                    </label>

                    <label class="checkbox-container">
                        <input type="checkbox" id="setting-show-type" ${this.currentSettings.showBarcodeType ? 'checked' : ''}>
                        <span class="checkmark"></span> Show Symbology Type Text
                    </label>

                    <label class="checkbox-container">
                        <input type="checkbox" id="setting-quiet-zone" ${this.currentSettings.includeQuietZone ? 'checked' : ''}>
                        <span class="checkmark"></span> Enforce Safety Quiet Zone
                    </label>
                </div>
                
                <div class="settings-preview-banner">
                    <em>Changes will reflect instantly on download payload arrays.</em>
                </div>
            </div>
        `;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const structuralToggles = [
            { id: 'setting-show-header', key: 'showHeader' },
            { id: 'setting-show-footer', key: 'showFooter' },
            { id: 'setting-show-text', key: 'showValueText' },
            { id: 'setting-show-type', key: 'showBarcodeType' },
            { id: 'setting-quiet-zone', key: 'includeQuietZone' }
        ];

        structuralToggles.forEach(toggle => {
            const element = document.getElementById(toggle.id);
            element?.addEventListener('change', (e) => {
                this.currentSettings[toggle.key] = e.target.checked;
                // Broadcast updated configuration object to the orchestrator
                this.onChange(this.currentSettings);
            });
        });
    }
}