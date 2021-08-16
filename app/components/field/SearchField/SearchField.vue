<template>
    <field-container :md="md">
        <v-text-field
            :value="value"
            class="mx-2 mb-7 search-form"
            height="40"
            append-icon="mdi-magnify"
            background-color="white"
            dense
            outlined
            clearable
            hide-details
            @input="input($event)"
        />
    </field-container>
</template>

<script src="./SearchField.js"></script>

<style scoped></style>

<docs>
    Tampilan standard
    ```vue
    <search-field />
    ```
</docs>
