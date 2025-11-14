import ResourceService from '@/services/ResourceService'
import { activateError } from '@/helpers/manageErrors'

export default {
  /**
   * Get student assessment by ID
   * @param {number} id Assessment ID
   */
  async getStudentAssessment(id) {
    const response = await ResourceService.get(`student/assessments/${id}`)

    if (response.status === 404) {
      activateError({
        status: 404,
        message: 'Seguimiento teórico no encontrado'
      })

      return false
    }

    if (response.status === 403) {
      activateError({
        status: 403,
        message: 'No autorizado para ver este seguimiento teórico'
      })

      return false
    }

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.result
  },

  /**
   * Get student assessment result
   * @param {number} assessmentId Assessment ID
   */
  async getAssessmentResult(assessmentId) {
    const response = await ResourceService.get(
      `student/assessments/result/${assessmentId}`
    )

    if (response.status === 404) {
      // No result yet, that's okay
      return null
    }

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.result
  },

  /**
   * Submit assessment result
   * @param {number} assessmentId Assessment ID
   * @param {object} data { questions_right, questions_wrong, questions_not_answered }
   */
  async submitAssessmentResult(assessmentId, data) {
    const response = await ResourceService.post(
      `student/assessments/result/${assessmentId}`,
      data
    )

    if (response.status === 409) {
      ResourceService.warning({
        response,
        title: 'Ya enviado',
        message: 'Ya has enviado un resultado para este seguimiento teórico'
      })

      return false
    }

    if (response.status === 412) {
      ResourceService.warning({
        response,
        title: 'Error de validación',
        message:
          response.data?.message ||
          'La fecha límite ha pasado o el total de preguntas no coincide'
      })

      return false
    }

    if (response.status !== 201) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.result
  }
}
