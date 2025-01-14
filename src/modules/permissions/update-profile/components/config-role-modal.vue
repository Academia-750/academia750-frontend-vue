<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="500px">
      <v-card>
        <v-card-title>
          Configuración del rol: <br />
          <span class="text-subtitle-1 font-weight-bold">
            {{ permission?.alias_name }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="mt-4">
            <!-- Dynamic form based on role.id -->
            <div
              v-if="permission?.name === PermissionEnum.UPDATE_GROUP_MATERIALS"
            >
              <v-form ref="form">
                <WorkSpacesAutoComplete
                  :workspaces="form.workspaces"
                  @change="form.workspaces = $event"
                ></WorkSpacesAutoComplete>
              </v-form>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <ResourceButton
            :text-button="'Cancelar'"
            icon-button="mdi-close"
            @click="close"
          />
          <ResourceButton
            :text-button="'Guardar'"
            color="primary"
            icon-button="mdi-check"
            :loading="loading"
            @click="submit"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2'
import { PermissionEnum } from '@/utils/enums'
import ProfileRepository from '@/services/ProfileRepository'
export default {
  name: 'ConfigRoleModal',
  components: {
    WorkSpacesAutoComplete: () =>
      import('@/modules/resources/components/form/work-spaces-auto-complete'),
    ResourceButton: () =>
      import('@/modules/resources/components/resources/ResourceButton')
  },
  props: {
    roleId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      PermissionEnum,
      isOpen: false,
      loading: false,
      permission: null,
      form: {
        workspaces: []
      }
    }
  },

  methods: {
    open({ permission, config }) {
      if (!permission) {
        return
      }
      this.permission = permission
      this.resetForm()
      // Config can be empty initially
      if (config) {
        try {
          this.form = JSON.parse(config)
        } catch (error) {
          // Silent error
          console.error(error)
        }
      }
      this.isOpen = true
    },

    close() {
      this.isOpen = false
      this.resetForm()
    },

    resetForm() {
      this.formData = {
        workspaces: []
      }

      const { form } = this.$refs

      if (form) {
        form.reset()
      }
    },

    async submit() {
      this.loading = true

      // Validate form if needed
      const { form } = this.$refs

      if (form && !form.validate()) {
        return
      }

      // Use only the variables config by this specific role
      const rawConfig = Object.keys(this.form).reduce((json, key) => {
        if (this.form[key]) {
          json[key] = this.form[key]
        }

        return json
      }, {})

      const data = {
        roleId: this.roleId,
        permissionId: this.permission.id,
        config: JSON.stringify(rawConfig)
      }

      const result = await ProfileRepository.configPermission(data)

      if (!result) {
        return
      }
      this.loading = false

      Swal.fire({
        toast: true,
        timer: 2000,
        icon: 'success',
        title: 'Configuración guardada exitosamente'
      })

      this.$emit('submitted', {
        permissionId: this.permission.id,
        config: data.config
      })
      this.close()
    },

    onChangeWorkspace(workspaces) {
      this.form.workspaces = workspaces
    }
  }
}
</script>

<style scoped>
.v-card-text {
  padding-top: 0;
}
</style>
