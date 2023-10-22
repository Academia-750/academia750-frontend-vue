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
  SEE_LESSON_PARTICIPANTS: 'participants-lessons' // Allows you to see the list of participants
}
