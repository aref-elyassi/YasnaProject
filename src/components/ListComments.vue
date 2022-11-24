<template>
    <div class="container">
        <div class="row d-flex align-items-center justify-content-center border rounded comments mt-1">
            <div class="col-md-10 p-3">
                <h4>Author: {{comments.author}}</h4>
                <p>{{comments.body}}</p>
                <p>{{comments.time}}</p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:['comments'],
        setup(){
           
        }
    }
</script>

<style  scoped>
.comments{
    background: #e3e3e3;
}
</style>