import { menuItems } from '../constant/sidebar-menu';

describe('menuItems', () => {
  test('should have the correct structure', () => {
    expect(Array.isArray(menuItems)).toBe(true);
    expect(menuItems.length).toBe(5);
  });

  test('each menu item should have required properties', () => {
    menuItems.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('path');
      expect(item).toHaveProperty('icon');
      expect(typeof item.id).toBe('string');
      expect(typeof item.name).toBe('string');
      expect(typeof item.path).toBe('string');
      expect(typeof item.icon).toBe('string');
    });
  });

  test('dashboard item should have correct values', () => {
    const dashboardItem = menuItems.find((item) => item.id === 'dashboard');
    expect(dashboardItem).toBeDefined();
    expect(dashboardItem).toEqual({
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
    });
    if (dashboardItem) {
      expect(dashboardItem.isIntegrated).toBeUndefined();
    }
  });

  test('should have the correct number of integrated items', () => {
    const integratedItems = menuItems.filter((item) => item.isIntegrated === true);
    expect(integratedItems.length).toBe(2);

    const nonIntegratedItems = menuItems.filter((item) => item.isIntegrated !== true);
    expect(nonIntegratedItems.length).toBe(3);
  });

  test('IAM item should be integrated', () => {
    const iamItem = menuItems.find((item) => item.id === 'iam');
    expect(iamItem).toBeDefined();
    if (iamItem) {
      expect(iamItem.isIntegrated).toBe(true);
    }
    if (iamItem) {
      expect(iamItem.name).toBe('IAM');
      expect(iamItem.path).toBe('/identity-management');
      expect(iamItem.icon).toBe('Users');
    }
  });

  test('Inventory item should be integrated', () => {
    const inventoryItem = menuItems.find((item) => item.id === 'inventory');
    expect(inventoryItem).toBeDefined();
    if (inventoryItem) {
      expect(inventoryItem.isIntegrated).toBe(true);
      expect(inventoryItem.name).toBe('Inventory');
      expect(inventoryItem.path).toBe('/inventory');
      expect(inventoryItem.icon).toBe('Store');
    }
  });

  test('all paths should start with a slash', () => {
    menuItems.forEach((item) => {
      expect(item.path.startsWith('/')).toBe(true);
    });
  });
});
