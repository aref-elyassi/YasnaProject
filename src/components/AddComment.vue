<template>
    <div class="container">
        <div class="row">
            <form>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                    <textarea v-model="articleText" class="form-control" id="exampleFormControlTextarea1" rows="3"
                        placeholder="Write Your Article(In MarkDown)"></textarea>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>