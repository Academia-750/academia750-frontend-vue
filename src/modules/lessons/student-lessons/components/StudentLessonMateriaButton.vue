<resource-button
  text-button="Materiales"
  icon-button="mdi-folder-open"
  color="success"
  :config-route="{
    name: 'student-list-of-materials',
    params: { id: lesson.id }
  }"
  :disabled="hasPermssionTo(Permssion.SEE_MATERIALS)"
/>
