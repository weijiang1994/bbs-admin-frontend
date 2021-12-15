<style>
</style>
<template>
  <div id="user">
    <bread></bread>
    <pagination></pagination>
  </div>
</template>

<script>
import Bread from '@/components/bread'
import Pagination from '@/components/pagination'
export default {
  name: 'User',
  components: {
    Bread,
    Pagination
  }
}
</script>