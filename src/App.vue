<template>
    <div id="app">
        <Header />
        <Sidebar />
        <Content />
    </div>
</template>

<script>
    import Header from './components/Shared/Header'
    import Sidebar from './components/Shared/Sidebar'
    import Content from './components/Shared/Content'

    export default {
        components: {
            Header,
            Sidebar,
            Content,
        }
    }
</script>

<style>
    
</style>