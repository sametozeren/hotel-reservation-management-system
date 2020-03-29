<template>
  <div id="app">
    <div id="page-top">
      <Preloader />
      <div class="page db-social">
        <Header />
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './components/Shared/Header'
  import Sidebar from './components/Shared/Sidebar'
  import Preloader from './components/Shared/Preloader'

  export default {
    name: 'App',
    components: {
      Header,
      Sidebar,
      Preloader,
    }
  }
</script>

<style>

</style>