<template>
    <v-select
        :value="value"
        class="flex md2 mx-2 search-form"
        :items="items"
        placeholder="Range Harga"
        outlined
        height="40"
        background-color="white"
        @input="$emit('input', $event)"
    />
</template>

<script src="./RangeHargaField.js"></script>

<style scoped></style>

<docs>
    Tampilan standard
    ```vue
    <range-harga-field />
    ```
</docs>
