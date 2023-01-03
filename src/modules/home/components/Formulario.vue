<template>
  <div class="estilo_formulario">
    <v-container>
      <v-row align="center">
        <v-col lg="6" cols="12">
          <h2>Contacto con nosotros</h2>
          <p>Estaremos encantados de resolverte cualquier duda.</p>
        </v-col>
        <v-col lg="6" cols="12" class="text-center">
          <div>
            <a href="#">+34663261014</a>
          </div>
          <div>
            <a href="#">info@academia750.com</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" lg="3">
            <v-select :items="itemsMotivo" placeholder="Motivo"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="Nombre"
              
              placeholder="Nombre"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="Apellidos"
             
              placeholder="Apellidos"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="Email"
             
              placeholder="Email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6">
            <v-text-field
              v-model="Telefono"
           
              placeholder="Teléfono"
              required
            ></v-text-field>
          </v-col>
          <v-col class="mensaje_estilo">
            <v-textarea
              solo
              name="Comentarios"
              label="Solo textarea"
            ></v-textarea>
          </v-col>
          <v-col cols="12 ">
            <v-btn class="btn-3" @click="submit"> Enviar </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'Formulario',
  data() {
    return {
      itemsMotivo: ['General', 'Recuperar Contraseña' , 'Unete']
    }
  }
}
</script>
<style>
.estilo_formulario {
  background: linear-gradient(180deg, #47a2bc 34.9%, #81b3c1 100%);
  padding: 80px 0px;
  color: #fff;
}
.estilo_formulario a {
  color: #fff !important;
  font-size: 16px;
  font-family: var(--fuente_uno) !important;
  text-decoration: none !important;
}
.estilo_formulario h2 {
  font-family: var(--fuente_cuatro);
  font-size: 48px;
}
.estilo_formulario input {
  background-color: #fff !important;
  padding-top: 0px !important;
  margin-top: 0px !important;
  height: 51px !important;
  max-height: 51px !important;
}
.estilo_formulario .col-12,
.mensaje_estilo {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.estilo_formulario .v-input {
  padding-top: 0px !important;
  margin-top: 0px !important;
  border: none !important;
  caret-color: none !important;
}

.estilo_formulario input,
.estilo_formulario textarea,
.mensaje_estilo .v-input__slot {
  border-radius: 0px !important;
  padding-left: 10px;
}

.estilo_formulario input::placeholder,
.estilo_formulario textarea::placeholder,
.estilo_formulario label , .estilo_formulario .v-select__slot , .estilo_formulario  .v-select__selection{
  font-size: 16px !important;
  font-family: var(--fuente_uno) !important;
  color: #b5b5b5 !important;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  display: none;
}
.btn-3 {
  width: 150px;
  background-color: #bf1215;
  background: linear-gradient(101.58deg, #bf1215 42.62%, #df5457 118.43%);
  border: none !important;
  border-radius: 20px;
  font-family: var(--fuente_cuatro);
  font-size: 18px !important;
  height: 53px !important;
  display: flex;
  margin-left: auto;
  color: #fff !important;
}
.estilo_formulario .v-select__slot{
    background: #fff;
    padding-left: 10px;
}
</style>
