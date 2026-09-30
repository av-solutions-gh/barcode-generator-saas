import { SidebarComponent } from './components/sidebar.js';
import { WorkspaceComponent } from './components/workspace.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core instances mapping
    const workspace = new WorkspaceComponent('workspace-container');
    
    // 2. Event bridge callback sequence
    const handleMenuSelection = (selectedTarget) => {
        console.log(`UI Workspace shifting perspective to: ${selectedTarget}`);
        workspace.render(selectedTarget);
    };

    const sidebar = new SidebarComponent('sidebar-container', handleMenuSelection);

    // 3. Initial baseline bootstrap layout
    sidebar.render();
    workspace.render('code128'); // Set Code 128 as system default layout
});