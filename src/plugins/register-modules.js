import { registerModules } from '@/helpers/register-modules'
import errors from '@/modules/errors/system'
import loading from '@/modules/loading'
import login from '@/modules/auth/login'
import profile from '@/modules/profile'
import oppositions from '@/modules/oppositions'
import subtopics from '@/modules/subtopics'
import topics from '@/modules/topics'
import students from '@/modules/students'
import subtopicsOfTopic from '@/modules/subtopicsOfTopic'
import oppositionsOfTopic from '@/modules/oppositionsOfTopic'
import questionsTopic from '@/modules/questionsTopic'
import questionsSubtopic from '@/modules/questionsSubtopic'
import imports from '@/modules/imports'
import tests from '@/modules/tests'
import home from '@/modules/home'
import statistics from '@/modules/statistics'
import groups from '@/modules/groups'
import tags from '@/modules/tags'
import workspaces from '@/modules/workspaces'
import lessons from '@/modules/lessons'
import permissions from '@/modules/permissions'

registerModules({
  errors,
  loading,
  login,
  profile,
  oppositions,
  subtopics,
  topics,
  students,
  subtopicsOfTopic,
  oppositionsOfTopic,
  questionsTopic,
  questionsSubtopic,
  tests,
  imports,
  home,
  statistics,
  groups,
  workspaces,
  lessons,
  permissions,
  tags
})
