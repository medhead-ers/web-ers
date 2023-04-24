<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse" style="">
    <div class="sidebar-sticky pt-3">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Menu principal</span>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="nav-link" exact-active-class="active">
            Dashboard
          </router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Autres fonctionnalités</span>
      </h6>
      <ul class="nav flex-column mt-2 mb-2">
        <li class="nav-item">
          <router-link to="/hospitals" class="nav-link" active-class="active">
            <b-icon icon="bank" /> &nbsp;
            Gestion des Hôpitaux
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>

</style>
