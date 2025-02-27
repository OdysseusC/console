const PACKAGE_DIRECTORY_NAME_PREFIX = 'tkeel-console-';
const PACKAGE_NAME_PREFIX = '@tkeel/console-';

const PORTAL_ADMIN_PACKAGE_SIMPLE_NAME = 'portal-admin';
const PORTAL_ADMIN_PACKAGE_DIRECTORY_NAME = `${PACKAGE_DIRECTORY_NAME_PREFIX}${PORTAL_ADMIN_PACKAGE_SIMPLE_NAME}`;
const PORTAL_ADMIN_PACKAGE_NAME = `${PACKAGE_NAME_PREFIX}${PORTAL_ADMIN_PACKAGE_SIMPLE_NAME}`;
const PORTAL_TENANT_PACKAGE_SIMPLE_NAME = 'portal-tenant';
const PORTAL_TENANT_PACKAGE_DIRECTORY_NAME = `${PACKAGE_DIRECTORY_NAME_PREFIX}${PORTAL_TENANT_PACKAGE_SIMPLE_NAME}`;
const PORTAL_TENANT_PACKAGE_NAME = `${PACKAGE_NAME_PREFIX}${PORTAL_TENANT_PACKAGE_SIMPLE_NAME}`;

const PACKAGES_PREFIX = {
  directoryName: PACKAGE_DIRECTORY_NAME_PREFIX,
  pluginDirectoryName: `${PACKAGE_DIRECTORY_NAME_PREFIX}plugin-`,
  packageName: PACKAGE_NAME_PREFIX,
  pluginPackageName: `${PACKAGE_NAME_PREFIX}plugin-`,
};

const PORTAL_PACKAGES = {
  admin: {
    simpleName: PORTAL_ADMIN_PACKAGE_SIMPLE_NAME,
    directoryName: PORTAL_ADMIN_PACKAGE_DIRECTORY_NAME,
    packageName: PORTAL_ADMIN_PACKAGE_NAME,
  },
  tenant: {
    simpleName: PORTAL_TENANT_PACKAGE_SIMPLE_NAME,
    directoryName: PORTAL_TENANT_PACKAGE_DIRECTORY_NAME,
    packageName: PORTAL_TENANT_PACKAGE_NAME,
  },
  simpleNames: [
    PORTAL_ADMIN_PACKAGE_SIMPLE_NAME,
    PORTAL_TENANT_PACKAGE_SIMPLE_NAME,
  ],
  directoryNames: [
    PORTAL_ADMIN_PACKAGE_DIRECTORY_NAME,
    PORTAL_TENANT_PACKAGE_DIRECTORY_NAME,
  ],
  packageNames: [PORTAL_ADMIN_PACKAGE_NAME, PORTAL_TENANT_PACKAGE_NAME],
};

const SHARED_PACKAGE_SIMPLE_NAMES = [
  'business-components',
  'components',
  'constants',
  'hooks',
  'icons',
  'themes',
  'types',
  'utils',
  'portal-base',
  'request-hooks',
];

const COMMON_PACKAGE_SIMPLE_NAMES = [
  PORTAL_ADMIN_PACKAGE_SIMPLE_NAME,
  PORTAL_TENANT_PACKAGE_SIMPLE_NAME,
  ...SHARED_PACKAGE_SIMPLE_NAMES,
];

const EXCLUDE_PACKAGE_DIRECTORY_NAMES = ['types-tkeel-console'];

module.exports = {
  PACKAGES_PREFIX,
  PORTAL_PACKAGES,
  SHARED_PACKAGE_SIMPLE_NAMES,
  COMMON_PACKAGE_SIMPLE_NAMES,
  EXCLUDE_PACKAGE_DIRECTORY_NAMES,
};
