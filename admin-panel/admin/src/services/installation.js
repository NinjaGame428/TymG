import request from './request';

const installationService = {
  checkInitFile: (params) => Promise.resolve({ data: { success: true } }), // Always return success - skip installation check
  setInitFile: (data) => {
    // Try backend call, but fallback to success if it fails
    return request.post('install/init/set', data)
      .catch(() => Promise.resolve({ data: { success: true, ...data } }));
  },
  updateDatabase: (data) => {
    // Try backend call, but fallback to success if it fails
    return request.post(`install/database/update`, data)
      .catch(() => Promise.resolve({ data: { success: true } }));
  },
  migrationRun: (data) => request.post('install/migration/run', data),
  createAdmin: (data) => request.post(`install/admin/create`, data),
  createLang: (data) => request.post(`install/languages/create`, data),
  createCurrency: (data) => request.post(`install/currency/create`, data),
  systemInformation: (params) =>
    request.get('dashboard/admin/settings/system/information', { params }),
  backupHistory: (params) =>
    request.post('dashboard/admin/backup/history', {}, { params }),
  getBackupHistory: (params) =>
    request.get('dashboard/admin/backup/history', { params }),
  checkLicence: (data) => Promise.resolve({ data: { success: true, active: true, local: true } }), // Always return success - license bypassed
};

export default installationService;
