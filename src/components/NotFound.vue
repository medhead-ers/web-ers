<template>
  <div id="NotFound" class="d-flex vh-100 align-items-center justify-content-center">
    <div class="fs-2 text-center">
      <brand-name />
      <h1 class="mt-4">Error 404 - Not found.</h1>
    </div>

  </div>
</template>

<script>
import BrandName from "@/components/layouts/BrandName.vue";

export default {
  name: 'NotFound',
  components: {BrandName}
}
</script>
