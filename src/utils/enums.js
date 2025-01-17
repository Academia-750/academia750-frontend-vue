export const PermissionEnum = {
  /**
   * Tests
   */
  GENERATE_TESTS: 'generate-tests',

  /**
   * Lessons
   */
  SEE_TEST: 'see-tests', // Only allow to see your tests
  SEE_LESSONS: 'see-lessons', // Only allow to see your lessons but nothing else
  JOIN_LESSONS: 'join-lessons', // Allows confirm your participation to a lesson
  SEE_ONLINE_LESSON: 'online-lessons', // Allows you to access the online lessons page
  SEE_LESSON_MATERIALS: 'material-lessons', // Allows you to access lessons materials type material
  SEE_LESSON_RECORDINGS: 'recording-lessons', // Allows you to access lessons materials type recordings
  SEE_LESSON_PARTICIPANTS: 'participants-lessons', // Allows you to see the list of participants

  /**
   * Management
   */
  SEE_LESSONS_AS_MANAGER: 'see-lessons-as-manager',
  UPDATE_GROUP_LESSONS: 'update-lessons', // Update lessons you belong of (NOT IMPLEMENTED)
  UPDATE_LESSON_MATERIALS: 'update-lesson-materials', // Update materials of lessons you belong of
  UPDATE_LESSON_STUDENTS: 'update-lesson-students' // Update students of lessons you belong of (NOT IMPLEMENTED)
}

export const PermissionsWithConfig = {
  [PermissionEnum.UPDATE_LESSON_MATERIALS]: true
}
