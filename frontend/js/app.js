import { SidebarComponent } from './components/sidebar.js';
import { WorkspaceComponent } from './components/workspace.js';
import { SettingsComponent } from './components/settings.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize state-tracking components
    const workspace = new WorkspaceComponent('workspace-container');
    
    const handleSettingsChange = (updatedSettings) => {
        console.log('App Orchestrator received fresh layout parameters:', updatedSettings);
        // This will be piped directly into our generation payload calls later
    };
    
    const settings = new SettingsComponent('settings-container', handleSettingsChange);

    const handleMenuSelection = (selectedTarget) => {
        console.log(`UI Workspace shifting perspective to: ${selectedTarget}`);
        workspace.render(selectedTarget);
    };

    const sidebar = new SidebarComponent('sidebar-container', handleMenuSelection);

    // 2. Initial baseline bootstrap layout engine execution
    sidebar.render();
    workspace.render('code128');
    settings.render();
});
