import Swal from 'sweetalert2/dist/sweetalert2'
  
  export default {
    async error(title) {
      const result = await Swal.fire({
        icon: 'error',
        toast: true,
        title,
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      
      return result.isConfirmed
    },
    async success(title) {
      Swal.fire({
        icon: 'success',
        toast: true,
        title,
        timer: 3000
      })

      return true
    },
    async dialog(title, message) {
      const result = await  Swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title,
        html: `<b>Esta acción es irreversible</b><br>${message}`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })
      
      return result
    }
  }