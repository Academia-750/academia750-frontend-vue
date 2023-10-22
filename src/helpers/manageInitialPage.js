import { hasPermissions } from './managePermissions'
import { hasRoles } from './manageRoles'
import { PermissionEnum } from '@/utils/enums'

export const getInitialPage = function () {
  if (hasRoles(['admin'])) {
    return 'manage-students'
  }

  if (hasPermissions([PermissionEnum.SEE_LESSONS])) {
    return 'my-lessons'
  }

  if (hasPermissions([PermissionEnum.GENERATE_TESTS])) {
    return 'generate-questionnaire'
  }

  return 'update-my-profile'
}
