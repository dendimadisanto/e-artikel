<template>
    <v-select
        :value="value"
        class="flex md2 mx-2 search-form"
        :items="items"
        item-value="biro_status_paket_id"
        item-text="nama"
        placeholder="Status Keberangkatan"
        outlined
        height="40"
        background-color="white"
        @input="$emit('input', $event)"
    />
</template>

<script src="./StatusKeberangkatanField.js"></script>

<style scoped></style>

<docs>
    Tampilan standard
    ```vue
    <status-keberangkatan-field />
    ```
</docs>
